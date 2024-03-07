import { Router } from "express";
import { authController } from "../controllers/auth.controller.js";
import  SchemaValidator from '../_middleware/schema_validator.js';
import { userController } from "../controllers/user.controller.js";
const validateRequest = SchemaValidator(true);
import {auth} from "./../_middleware/auth.js";


//const router = Router();
const userRouter = Router();



userRouter.post("/recovery",validateRequest, authController.signin);

userRouter.post("/signup",validateRequest, userController.signUser);

userRouter.get("/:userId", userController.getUserById);



export default userRouter;
