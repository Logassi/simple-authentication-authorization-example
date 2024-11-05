import { Router } from "express";
import {
  Login,
  Register,
  GetUserLogin,
  GetUsers,
} from "../controllers/auth.controller";
import { VerifyToken, AdminGuard } from "../middlewares/auth.middleware";

const router = Router();

router.post("/register", Register);

router.post("/login", Login);

router.get("/me", VerifyToken, GetUserLogin);

router.get("/users", VerifyToken, AdminGuard, GetUsers);

export default router;
