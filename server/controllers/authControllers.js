import { User } from '../models/userModel.js';
import bcryptjs from 'bcryptjs'
import crypto from 'crypto'
import jwt from 'jsonwebtoken';
import transporter from '../config/nodemailer.js';


export const signup = async (req,res)=>{

    const {email,password,name} = req.body;

    try {
        if(!email || !password || !name){
            throw new error("All fields are required");
            // res.send("all are required")
        }

        const userAlreadyExists = await User.findOne({email})
        if(userAlreadyExists){
            return res.status(400).json({success : false , message : "User Already Exists"})
        }

        const hashedpassword = await bcryptjs.hash(password,10)
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString()

        const user = new User({
            email,
            password: hashedpassword,
            name,
            verificationToken,
            verificationTokenExpiresAt:Date.now() + 24 * 60 * 60 * 1000
        })

        await user.save();

        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'})

        res.cookie("token" , token ,{
            httpOnly : true,
            secure : process.env.NODE_ENV === 'production',
            sameSite : process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge : 7 * 24 * 60 * 60 * 1000,
        });

        const mailoptions = {
            from: process.env.SENDER_MAIL,
            to: email,
            subject: 'Welcome to Authentication Website',
            text: `Welcome to Authentication Website. Your account has been created with email id ${email}`,
        };

          await transporter.sendMail(mailoptions)
         



        res.status(201).json({
            success : true,
            message : "user created successfully",
            user : 
            {
                ...user._doc,
                password : undefined,
            },
        });

    } catch (error) {
        return res.status(400).json({success:false,message:error.message})
    }
//    return res.send(req.body)
}

export const login = async (req,res)=>{
    const {email,password} = req.body;

    if(!email || !password){
        return res.send("Fill all above columns")
    }

    try {

        const user = await User.findOne({email})
        if(!user){
            return res.json({success:'false',msg:"Invalid Email"})
        }
        const isMatch = await bcryptjs.compare(password,user.password)

        if(!isMatch){
            return res.json({success:"false",msg:"Incorrect credentials"})
        }

        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'})

        res.cookie("token" , token ,{
            httpOnly : true,
            secure : process.env.NODE_ENV === 'production',
            sameSite : process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge : 7 * 24 * 60 * 60 * 1000,
        });

        return res.json({success:"true",msg:"Logged In successfully"})

    } catch (error) {
        return res.json({success:"false",msg:error.message})
    }
}

export const logout = async (req,res) =>{
    try {

        res.clearCookie("token" , token ,{
            httpOnly : true,
            secure : process.env.NODE_ENV === 'production',
            sameSite : process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge : 7 * 24 * 60 * 60 * 1000,
        });

        return res.json({success:true,msg:"Logged Out Successfully"})

        
    } catch (error) {
        return res.json({success:"false",msg:error.msg})
    }
}

export const sendVerifyOTP = async(req,res)=>{
    try {
        const {userId} = req.body;

        const user = await User.findById(userId)

        if(user.isAccountVerified){
            return res.json({success:"false",message:"User Already Verified "})
        }

        const otp = String(Math.floor(10000 + Math.random()*900000));

        user.verifyOTP = otp;
        user.verifyOTPExpiresAt = Date.now() + 24 * 60 * 60 * 1000

        await user.save()

        const mailoptions = {
            from: process.env.SENDER_MAIL,
            to: user.email,
            subject: 'OTP for Your Account',
            text: `OTP for Your account is ${otp}`,
        };

          await transporter.sendMail(mailoptions)
         

    } catch (error) {
        return res.json({success:"false",msg:error.msg})
    }

    return res.json({success:"true",msg:"OTP Your Account"})

}

export const verifyEmail = async(req,res)=>{
    const {userId,otp} = req.body;

    if(!otp){
        return res.json({success:"false",msg:"missing details"})
    }

    try {
        const user = await User.findById(userId)

        if(!user){
            return res.json({success:"false",msg:"user not found"})
        }
        if(user.verifyOTP === '' || user.verifyOTP !== otp){
            return res.json({success:"false",msg:"Invalid OTP"})
        }
        if(user.verifyOTPExpiresAt < Date.now()){
            return res.json({success:"false",msg:"OTP Expired"})
        }

        user.isAccountVerified = true;
        user.verifyOTP = '';
        user.verifyOTPExpiresAt = 0;

        await user.save()

        return res.json({success:"true",msg:"Email Verified Successfully"})
    } catch (error) {
        return res.json({success:"false",msg:error.msg})
    }

     return res.json({success:"true",msg:"Your Account Verified Successfully"})
}

export const isAuthenticated = async(req,res)=>{
    try {
        return res.json({success:"true"})
    } catch (error) {
        return res.json({success:"false",msg:error.msg})
    }
}

export const resetOTP = async(req,res)=>{
    const {email} = req.body;

    if(!email){
        return res.json({success:"false",msg:"Enter Details"})
    }

    try {

        const user = await User.findOne({email})

        if(!user){
            return res.json({success:"false",msg:"Invalid Email"})
        }

        const otp = String(Math.floor(10000 + Math.random()*900000));

        user.resetOTP = otp;
        user.resetOTPExpiresAt = Date.now() + 24 * 60 * 60 * 1000

        await user.save()

        
        const mailoptions = {
            from: process.env.SENDER_MAIL,
            to: email,
            subject: 'RESET OTP for Your Account',
            text: `RESET OTP for Your account is ${otp}`,
        };

          await transporter.sendMail(mailoptions)
         

    } 
    catch (error) {
        return res.json({success:"false",msg:error.msg})
    }

    return res.json({success:"true",msg:"OTP sent to your Email"})
}

export const resetpassword = async(req,res)=>{
    const {email,otp,newpassword} = req.body;

    if(!email || !otp || !newpassword){
        return res.json({success:"false",msg:"Fill the missing details"})
    }

    try {
        const user = await User.findOne({email})

        if(user.resetOTP === '' || user.resetOTP !== otp){
            return res.json({success:"false",msg:"Invalid OTP"})
        }

        if(user.resetOTPExpiresAt < Date.now()){
            return res.json({success:"false",msg:"OTP Expired"})
        }

        const hashedpassword = await bcryptjs.hash(newpassword,10)

        user.password = hashedpassword;
        user.resetOTP=''
        user.resetOTPExpiresAt=0;

        await user.save();

        return res.json({success:"true",msg:"Password Reset Successfully"})
    } catch (error) {
        return res.json({success:"false",msg:error.message})
    }
}