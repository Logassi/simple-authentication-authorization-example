import { Router, Request, Response, NextFunction } from "express";
import {
  Login,
  Register,
  GetUserLogin,
  GetUsers,
} from "../controllers/auth.controller";
import { VerifyToken, AdminGuard } from "../middlewares/auth.middleware";
import { RegisterValidation } from "../middlewares/validations/auth.validation";
import { SingleUploader } from "../utils/uploader";

const router = Router();

router.post("/register", RegisterValidation, Register);

router.post("/login", Login);

router.get("/me", VerifyToken, GetUserLogin);

router.get("/users", VerifyToken, AdminGuard, GetUsers);

//uploader
router.post(
  "/upload",
  SingleUploader("AVT", "/avatar"),
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const { file } = req;
      const { name } = req.body;

      if (!file) throw new Error("no file uploaded");

      res.status(200).send("file uploaded");
    } catch (error) {
      next(error);
    }
  }
);

export default router;
