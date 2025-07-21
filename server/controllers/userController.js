import { User } from "../models/userModel.js";

 export const getUserData = async(req,res)=>{

    try {
        

    const {userId} = req.body;

    const user = await User.findById(userId);

    if(!user){
        return res.json({success:"false",msg:"Invalid Email"})
    }

    res.json({
        success:true,
        getUserData : {
            name : user.name,
            isAccountVerified : user.isAccountVerified
        }
    })

} catch (error) {
        return res.json({success:"false",msg:error.message})
}
 }