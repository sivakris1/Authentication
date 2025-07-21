import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { toast } from 'react-toastify';

const ResetPassword = () => {
  const backend = 'http://localhost:4848';

  axios.defaults.withCredentials = true;
  const inputRefs = React.useRef([])
  const navigate = useNavigate()
  const [email,setEmail] = useState('')
  const [otp,setOtp] = useState(0)
  const [newpassword,setNewpassword] = useState('')
  const [isEmailSent,setIsEmailSent] = useState('')
  const [isOtpSubmitted,setIsOtpSubmitted] = useState('')

  const handleInput = (e,index)=>{
    if(e.target.value.length > 0 && index < inputRefs.current.length-1){
      inputRefs.current[index+1].focus();
    }
  }

  const handlekeydown = (e,index) =>{
    if(e.key === 'Backspace' && e.target.value === '' && index > 0){
      inputRefs.current[index-1].focus()
    }
  }

  const handlepaste = (e) =>{
    const paste = e.clipboardData.getData('text')
    const pasteArray = paste.split('')
    pasteArray.forEach((char,index) => {
      if(inputRefs.current[index]){
        inputRefs.current[index].value = char;
      }
    });
  }

  const onSubmitEmail = async(e) =>{
    e.preventDefault();
    try {
      const {data} = await axios.post(backend + '/api/auth/sendresetotp',{email});
      data.success === 'true' ? toast.success(data.msg) : toast.error(data.msg)
      data.success === 'true' && setIsEmailSent(true)
    } catch (error) {
      toast.error(error.message)
    }
  }

  const onSubmitOtp = async(e) =>{
    e.preventDefault();
    const otpArray = inputRefs.current.map(e => e.value)
    setOtp(otpArray.join(''))
    setIsOtpSubmitted(true)
  }

  const onSubmitNewpassword = async(e) =>{
    e.preventDefault();
    try {
      const {data} = await axios.post(backend + '/api/auth/resetpassword',{email,otp,newpassword})
      data.success === 'true' ? toast.success(data.msg) : toast.error(data.msg)
      data.success === 'true' && navigate('/login')
    } catch (error) {
      toast.error(error.message)
    }
  }
  return (
    <>
      <img src={assets.logo} alt="" className=' absolute left-5 hover:cursor-pointer' onClick={()=>navigate('/')}/>
      <div className='flex justify-center items-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400'>

{!isEmailSent && 
        <form className=' bg-slate-800 p-8 rounded-lg w-96 text-sm' onSubmit={onSubmitEmail}>
        <h1 className=' text-white text-2xl font-semibold text-center mb-4'>Reset Password </h1>
        <p className='text-center mb-6 text-indigo-300'>Enter your Registered Email </p>
        <div className=' mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
          <img src={assets.mail_icon} alt="" />
          <input type="email" placeholder='Email id' className='bg-transparent outline-none text-white' value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
        </div>
        <button className=' w-full py-3 bg-gradient-to-br from-indigo-500 to-indigo-900 text-white rounded-full hover:cursor-pointer'>Submit</button>
       
        </form>

}


{!isOtpSubmitted && isEmailSent &&
        <form className=' bg-slate-800 p-8 rounded-lg w-96 text-sm' onSubmit={onSubmitOtp}>
        <h1 className=' text-white text-2xl font-semibold text-center mb-4'>Enter OTP </h1>
        <p className='text-center mb-6 text-indigo-300'>Enter 6 digit code sent to your Email id </p>
        <div className=' flex justify-between mb-8' onPaste={handlepaste}>
          {Array(6).fill(0).map((_,index)=>(
            <input type="text" maxLength="1" key={index} required 
            className=' w-12 h-12 bg-[#333A5C] text-white text-center text-xl rounded-md'
            ref={e => inputRefs.current[index]=e}
            onInput={(e)=>{handleInput(e,index)}}
            onKeyDown={(e)=>{handlekeydown(e,index)}}
            />
          ))}
        </div>
        <button className=' w-full py-3 bg-gradient-to-br from-indigo-500 to-indigo-900 text-white rounded-full hover:cursor-pointer' >Verify Email </button>
     
        </form>
}

{isEmailSent && isOtpSubmitted &&
        <form className=' bg-slate-800 p-8 rounded-lg w-96 text-sm' onSubmit={onSubmitNewpassword}>
        <h1 className=' text-white text-2xl font-semibold text-center mb-4'>New Password </h1>
        <p className='text-center mb-6 text-indigo-300'>Enter Your New Password </p>
        <div className=' mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
          <img src={assets.lock_icon} alt="" />
          <input type="text" placeholder='new password' className='bg-transparent outline-none text-white' value={newpassword} onChange={(e)=>{setNewpassword(e.target.value)}}/>
        </div>
        <button className=' w-full py-3 bg-gradient-to-br from-indigo-500 to-indigo-900 text-white rounded-full hover:cursor-pointer'>Submit</button>
      

     </form>

}
    </div>
    </>
  )
}

export default ResetPassword
