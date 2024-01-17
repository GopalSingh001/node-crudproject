import express, { json } from "express";
import dotenv from "dotenv";
import contactRouter from "./routes/contactRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";
import connectDB from "./config/dbConnection.js";
import userRouter from "./routes/userRoutes.js";
import cors from "cors";

dotenv.config();
connectDB()
const app=express();


const port = process.env.PORT || 5656;
app.use(cors());
app.use(express.json())
app.use("/api/contacts",contactRouter);
app.use("/api/users",userRouter);


app.use(errorHandler);

app.listen(port,()=>{
    
    console.log(`server running on port ${port}..`);
})