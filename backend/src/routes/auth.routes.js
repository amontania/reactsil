import { Router } from "express";
import { authController } from "../controllers/auth.controller.js";
import  SchemaValidator from '../_middleware/schema_validator.js';
// import {checkDuplicateUsernameOrEmail} from "../_middleware/verifySignUp.js"
const validateRequest = SchemaValidator(true);


//const router = Router();
const authRouter = Router();

authRouter.post("/login", authController.signin);

authRouter.get("/refresh_token",authController.verifyRefreshToken);

authRouter.get("/logout",authController.logout);

authRouter.post("/signup",authController.signup );

export default authRouter;
