import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connectDB } from './config/mongodb.js';
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';

dotenv.config();

const app = express();

const allowedOrigins = ['http://localhost:5173']

app.use(express.json());
app.use(cookieParser());
app.use(cors({origin : allowedOrigins,credentials : true}))

app.get("/",(req,res)=>{
    res.send("welcome back")
})

app.use('/api/auth' , authRouter)
app.use('/api/user',userRouter)

app.listen(4000,()=>{
    console.log("server running")
    connectDB()
})


