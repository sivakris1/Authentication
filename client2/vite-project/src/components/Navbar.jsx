import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Navbar = () => {
  const navigate = useNavigate();
  const backend = 'http://localhost:4848';
  const {userData,setUserData,setIsLoggedin,logout} = useContext(AppContext)

  const sendverifyemail =async()=>{
    try {
      axios.defaults.withCredentials = true;
      const {data} = await axios.post(backend + '/api/auth/sendverifyotp')

      if(data.success === 'true'){
        navigate('/emailverify')
        toast.success(data.message)
      }
      else{
        toast.error(error.msg)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  return (
    <div className=' w-full flex justify-between p-4 sm:p-6 px-24 absolute top-0' >
      <img src={assets.logo} alt="" className=' w-28' />
      {userData ?
      <div className=' hover:cursor-pointer w-8 h-8 flex justify-center items-center rounded-full bg-black text-white relative group mx-15'>
        {userData.name[0].toUpperCase() }
        <div className=' w-38 absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-10'> 
          <ul className=' list-none m-0 p-2 bg-gray-100 text-sm'>
            {!userData.isAccountVerified === true && 
                <li className=' py-1 px-2 hover: bg-gray-500 cursor-pointer w-full' onClick={sendverifyemail}>Verify Email</li>

            }
            <li className=' py-1 px-2 hover: bg-gray-500 cursor-pointer' onClick={()=>{logout()}}> Logout</li>
          </ul>

        </div>
      </div> :
      <button className='flex gap-2 border border-gray-500 rounded-full px-6 py-3 text-gray-800 hover:bg-gray-200 cursor-pointer transition-all' onClick={()=>{navigate('/login')}}> Login <img src={assets.arrow_icon} alt="" /></button>
}
    </div>
  )
}

export default Navbar
