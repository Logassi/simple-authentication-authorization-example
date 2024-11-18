import { Router, Request, Response, NextFunction } from "express";
import {
  Login,
  Register,
  GetUserLogin,
  GetUsers,
  VerifyUser,
} from "../controllers/auth.controller";
import { VerifyToken, AdminGuard } from "../middlewares/auth.middleware";
import {
  LoginValidation,
  RegisterValidation,
} from "../middlewares/validations/auth.validation";
import { SingleUploader } from "../utils/uploader";

const router = Router();

router.post("/register", RegisterValidation, Register);

router.post("/login", LoginValidation, Login);

router.get("/me", VerifyToken, GetUserLogin);

router.get("/users", VerifyToken, AdminGuard, GetUsers);

//to verify when user click button verify
router.get("/verify", VerifyToken, VerifyUser);

//uploader
router.post(
  "/upload",
  SingleUploader("AVT", "/avatar"),
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const { file } = req;
      const { name } = req.body;

      console.log(file);

      if (!file) throw new Error("no file uploaded");

      console.log(name);

      res.status(200).send("file uploaded");
    } catch (error) {
      next(error);
    }
  }
);

export default router;
