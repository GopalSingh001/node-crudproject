import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";


import { userModel } from "../models/userModel.js";


//-------user register

export const userRegister = expressAsyncHandler(async (req,res)=>{
    const {username,email,password} = req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error("All fields are mandatory")
    }
    const userAvailable=await userModel.findOne({email})
    if(userAvailable){
        res.status(400);
        throw new Error("User already registered..")
    }
    //hash password
    const hashPassword=await bcrypt.hash(password,10);
    // console.log("hash password",hashPassword);

    const user =await userModel.create({
        username,
        email,
        password:hashPassword
    })
    console.log(`User Created : ${user}`);
    if(user){
        res.status(201).json({_id:user.id,email:user.email,message:"User register successful"})
    }else{
        res.status(400);
        throw new Error("User data is not valid .")
    }
});

//-------user login


export const userLogin = expressAsyncHandler(async (req,res)=>{
const {email,password}=req.body;

if(!email || !password){
    res.status(400);
    throw new Error("All fields are mandatory.")

}

const user=await userModel.findOne({email});
     
if(user && (await bcrypt.compare(password,user.password))){
    const accessToken = Jwt.sign({
        user:{
            username:user.username,
            email:user.email,
            id:user.id
        }
    },process.env.ACCESS_TOKEN_SECRET,
    {expiresIn:"1h"}
    )
    res.status(200).json({accessToken,message:"Login successfully"})
}else{
    res.status(401);
    throw new Error("Email or Password is not valid.")
}


});


// current user information
export const currentUser = expressAsyncHandler(async (req,res)=>{
    res.json(req.user);
});



