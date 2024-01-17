import express from "express";
import { currentUser, userLogin, userRegister } from "../controllers/userControllers.js";
import validateToken from "../middlewares/validateTokenHandler.js";

const userRouter=express.Router();
 
userRouter.post("/register",userRegister)

userRouter.post("/login",userLogin)

userRouter.get("/current",validateToken, currentUser)


 

export default userRouter;