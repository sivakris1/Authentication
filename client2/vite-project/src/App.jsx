import React from 'react'
import { Route, Router, Routes } from 'react-router-dom'
import Login from './pages/Login.jsx'
import ResetPassword from './pages/ResetPassword.jsx'
import Home from './pages/Home.jsx'
import EmailVerify from './pages/EmailVerify.jsx'
import { ToastContainer, toast } from 'react-toastify';


const App = () => {
  return (
    <div>
      <ToastContainer/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/emailverify' element={<EmailVerify/>}/>
          <Route path='/resetpassword' element={<ResetPassword/>}/>
        </Routes>
   </div>
  )
}

export default App
