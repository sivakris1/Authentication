import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';

const backend = 'http://localhost:4848';


const Login = () => {
  const navigate = useNavigate();

  const {backendURL,isLoggedin,setIsLoggedin,getUserData} = useContext(AppContext)

  const [state,setState] = useState('Sign Up')
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  const onSubmitHandler = async(e)=>{
    try {
      e.preventDefault();

      axios.defaults.withCredentials = true;

      if(state === 'Sign Up'){
        const {data} = await axios.post(backend + '/api/auth/signup',{name,email,password})

        if(data.success){
  
          setIsLoggedin(true)
          getUserData()
          navigate('/')
          toast.success(data.message)
        }
        else{
          toast.error(data.message)
        }
      }
      else{
        const {data} = await axios.post('http://localhost:4848' + '/api/auth/login',{email,password})

        if(data.success === 'true'){
          console.log(data)
          setIsLoggedin(true)
          getUserData()
          navigate('/')
          toast.success(data.msg)
        }
        else{
          toast.error(data.msg)
        }
      }
    } catch (error) {
      toast.error(error.message)
    }
 }  
 
 return (
    <>
    <img src={assets.logo} alt="" className=' absolute left-5 hover:cursor-pointer' onClick={()=>{navigate('/')}}/>
    <div className='flex justify-center items-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400'>
      
      <div className=' bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm'>
        <h2 className=' text-3xl font-semibold text-white text-center'>{state === 'Sign Up' ? 'Create Account':'Login'}</h2>
        <p className=' text-center text-sm mb-6'>{state === 'Sign Up' ? 'Create Your Account':'Login Your Account'}</p>

        <form onSubmit={onSubmitHandler}>
          {state === 'Sign Up' && (
            <div className='mb-4 flex items-center gap-3 w-full rounded-full bg-[#333A5C] px-5 py-2.5'>
            <img src={assets.person_icon} alt="" />
            <input onChange={e=>{setName(e.target.value)}} value={name} type="text" placeholder='FullName' required className='bg-transparent outline-none' />
          </div>
          )}
          
          <div className='mb-4 flex items-center gap-3 w-full rounded-full bg-[#333A5C] px-5 py-2.5'>
            <img src={assets.mail_icon} alt="" />
            <input onChange={e=>{setEmail(e.target.value)}} value={email} type="text" placeholder='Email' required className=' bg-transparent outline-none' />
          </div>
          <div className='mb-4 flex items-center gap-3 w-full rounded-full bg-[#333A5C] px-5 py-2.5'>
            <img src={assets.lock_icon} alt="" />
            <input onChange={e=>{setPassword(e.target.value)}} className='bg-transparent outline-none'  type="text" placeholder='Password' required />
          </div>

          <p className='mb-4 text-indigo-500 cursor-pointer' onClick={()=>{navigate('/resetpassword')}}>Forget Password?</p>

          <button className='w-full rounded-full text-white bg-gradient-to-r from bg-indigo-500 to inset-shadow-indigo-950 py-2.5 cursor-pointer'>{state}</button>

          {state === 'Sign Up' ? ( <p className=' text-gray-400 text-center mt-4 text-xs'>Already have an Account?{' '}
            <span className=' text-indigo-500 cursor-pointer underline' onClick={()=>{setState('Login')}}>Login here</span>
          </p>) : (
            <p className=' text-gray-400 text-center mt-4 text-xs'>Don't have an Account?{' '}
            <span className=' text-indigo-500 cursor-pointer underline' onClick={()=>{setState('Sign Up')}}>Sign Up</span>
          </p>
          )}
         

          
        </form>

      </div>
    </div>
    </>
  )
}

export default Login
