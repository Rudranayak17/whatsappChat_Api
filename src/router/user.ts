import express from "express";
import { validateData } from "../middleware/validationMiddleware.js";
import { userLoginSchema, userRegistrationSchema } from "../schema/user.js";
import { loginUser, registerUser } from "../controller/user.js";

const userRouter = express.Router();

userRouter.post('/register', validateData(userRegistrationSchema), registerUser);
userRouter.post('/login', validateData(userLoginSchema), loginUser);




export default userRouter