import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email:
    {
        type : String,
        required : true,
        unique : true
    },
    password:{
        type : String,
        required : true
    },
    name :{
        type : String,
        required : true
    },
    verifyOTP:{
        type:String,
        default:''
    },
    verifyOTPExpiresAt:{
        type:Number,
        default:0 
    },
    isAccountVerified : {
        type : Boolean,
        default : false
    },
    resetOTP:{
        type:String,
        default:''
    },
    resetOTPExpiresAt:{
        type:Number,
        default:0 
    }
})
export const User = mongoose.model('user',userSchema)