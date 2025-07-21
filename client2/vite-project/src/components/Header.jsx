import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const Header = () => {

  const {userData} = useContext(AppContext)
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center mt-20 px-4 text-center text-gray-800">
      <img src={assets.header_img} alt="" className=' w-36 h-36 mb-6 rounded-full'/>
      <h1 className=' flex items-center text-xl sm:text-3xl gap-3'>Hey {userData ? userData.name : "developer"} <img src={assets.hand_wave} alt="" className=' w-8 aspect-square' /></h1>
      <h2 className=' text-3xl sm:text-5xl p-3 font-semibold'>Welcome to our app</h2>
      <p className='mb-8 max-w-md'>Let's Start with a Product tour and we will have you up running in no time!</p>
      <button className=' border border-gray-800 rounded-full px-6 py-2.5 hover:bg-gray-300 transition-all hover:cursor-pointer' onClick={()=>{navigate('/login')}}>Get Started </button>
    </div>
  )
}

export default Header
