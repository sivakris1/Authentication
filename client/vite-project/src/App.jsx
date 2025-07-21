import React from 'react'
import {Route,Routes,Router} from 'react-router-dom'
import Home from '../pages/home'
import Login from '../pages/login'
import Emailverify from '../pages/Emailverify'

const App = () => {
  return (
    <div>
      <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Emailverify/>}/>
      </Routes>
      </Router>
    </div>
  )
}

export default App
