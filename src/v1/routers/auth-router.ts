import { Router } from "express";
import authController from "../controllers/auth-controller";

const AuthRouter = Router();

AuthRouter.post("/login", authController.login);
AuthRouter.post("/register", authController.register);
AuthRouter.get("/token/:token", authController.checkToken);

export default AuthRouter;
