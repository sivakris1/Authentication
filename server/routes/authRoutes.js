import express from "express";
import { isAuthenticated, login, logout, resetOTP, resetpassword, sendVerifyOTP, signup, verifyEmail } from "../controllers/authControllers.js";
import userAuth from "../middleware/userAuth.js";

const authRouter = express.Router();

authRouter.post('/signup',signup)

authRouter.post('/login',login)

authRouter.post('/logout',logout)

authRouter.post('/sendverifyotp', userAuth ,sendVerifyOTP)

authRouter.post('/verifyaccount', userAuth ,verifyEmail)

authRouter.get('/isauthenticated', userAuth ,isAuthenticated)

authRouter.post('/sendresetotp',resetOTP)

authRouter.post('/resetpassword',resetpassword)




export default authRouter;