import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { genSalt, hash, compare } from "bcrypt";
import { sign } from "jsonwebtoken";

import { SECRET_KEY, BASE_WEB_URL } from "../utils/envConfig";
import { User } from "../custom";
import path from "path";
import { transporter } from "../lib/mail";

import handlebars, { log } from "handlebars";
import fs from "fs";

const prisma = new PrismaClient();

async function Register(req: Request, res: Response, next: NextFunction) {
  try {
    const templatePath = path.join(
      __dirname,
      "../templates",
      "register-email.hbs"
    );

    console.log(templatePath);

    const templateSource = fs.readFileSync(templatePath, "utf-8");
    const compiledTemplate = handlebars.compile(templateSource);

    const { email, password, name } = req.body;

    const findUser = await prisma.user.findUnique({
      where: { email },
    });

    if (findUser) throw new Error("Email Sudah ada");

    const findRoleUser = await prisma.role.findUnique({
      where: { name: "user" },
    });

    if (!findRoleUser) throw new Error("Role tidak ada");

    const salt = await genSalt(10);
    const hashPassword = await hash(password, salt);
    // console.log("ill be moving on");

    await prisma.$transaction(async (prisma) => {
      // console.log("ill be moving on");
      await prisma.user.create({
        data: {
          email,
          name,
          password: hashPassword,
          roleId: 1,
        },
      });

      const payload = {
        email,
      };

      const token = sign(payload, SECRET_KEY as string, { expiresIn: "1hr" });

      const verificationURL = BASE_WEB_URL + `/verify/${token}`;
      console.log(verificationURL);

      const html = compiledTemplate({
        emailUser: email,
        name,
        token,
        verificationURL,
      });

      console.log("Sending");

      await transporter.sendMail({
        to: email,
        subject: "Registration",
        html,
      });
      console.log("Registered success");
    });

    // console.log("ill be moving on");
    // const newUser = await prisma.user.create({
    //   data: {
    //     email,
    //     name,
    //     password: hashPassword,
    //     roleId: 1,
    //   },
    // });

    res.status(200).send({
      message: "success",
      // data: newUser,
    });
  } catch (err) {
    next(err);
  }
}

async function Login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;

    const findUser = await prisma.user.findUnique({
      where: { email },
      include: {
        role: true,
      },
    });

    if (!findUser) throw new Error("Invalid Email");

    if (!findUser.isVerified)
      throw new Error("Please check email for verify account");

    const isValid = await compare(password, findUser.password);

    if (!isValid) throw new Error("Invalid password");

    const payload = {
      email,
      name: findUser.name,
      role: findUser.role.name,
    };

    const token = sign(payload, SECRET_KEY as string, { expiresIn: "1hr" });

    res.status(200).cookie("access_token", token).send({
      message: "success",
    });
  } catch (err) {
    next(err);
  }
}

async function GetUserLogin(req: Request, res: Response, next: NextFunction) {
  try {
    const { email } = req.user as User;

    const data = await prisma.user.findUnique({
      where: { email },
      select: {
        email: true,
        name: true,
        role: {
          select: {
            name: true,
          },
        },
      },
    });

    res.status(200).send({
      message: "Success",
      data,
    });
  } catch (err) {
    next(err);
  }
}

async function GetUsers(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await prisma.user.findMany({
      select: {
        email: true,
        name: true,
        role: {
          select: {
            name: true,
          },
        },
      },
    });

    res.status(200).send({
      message: "Success",
      data,
    });
  } catch (err) {
    throw err;
  }
}

async function VerifyUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { email } = req.user as User;

    await prisma.user.update({
      where: { email },
      data: {
        isVerified: true,
      },
    });

    res.status(200).send({
      message: "Verify success",
    });
  } catch (error) {
    next(error);
  }
}

export { Register, Login, GetUserLogin, GetUsers, VerifyUser };
