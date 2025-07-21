import React, { useContext, useEffect } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';



const EmailVerify = () => {

  const navigate = useNavigate()
  axios.defaults.withCredentials = true;
  const inputRefs = React.useRef([])
  const backend = 'http://localhost:4848';
  const {isLoggedin , userData , getUserData} = useContext(AppContext)

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

  const submithandler = async(e) =>{
    try {
      e.preventDefault();
      const otpArray = inputRefs.current.map(e=>e.value)
      const otp = otpArray.join('')

        const {data} = await axios.post(backend + '/api/auth/verifyaccount',{otp})
        
        if(data.success === 'true'){
          console.log("hi")
          console.log(data)
          toast.success(data.msg)
          getUserData()
          navigate('/')
        }
        else{
          console.log("hii")
          toast.error(data.msg)
        }

    } catch (error) {
      console.log("hiii")
      toast.error(error.msg)
    }
  }

  useEffect(()=>{
    isLoggedin && userData && userData.isAccountVerified && navigate('/')
  },[isLoggedin,userData])
  return (
    <>
        <img src={assets.logo} alt="" className=' absolute left-5 hover:cursor-pointer' onClick={()=>(navigate('/'))}/>
    
    <div className='flex justify-center items-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400'>

      <form action="" className=' bg-slate-800 p-8 rounded-lg w-96 text-sm'
      >
        <h1 className=' text-white text-2xl font-semibold text-center mb-4'>Email Verify OTP </h1>
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
        <button className=' w-full py-3 bg-gradient-to-br from-indigo-500 to-indigo-900 text-white rounded-full hover:cursor-pointer' onClick={submithandler}>Verify Email </button>
      </form>

    </div>
    </>
  )
}

export default EmailVerify
