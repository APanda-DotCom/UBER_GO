import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home.jsx'
import CaptainLogin from './pages/CaptainLogin.jsx'
import CaptainSignup from './pages/CaptainSignup.jsx'
import UserLogin from './pages/UserLogin.jsx'
import UserSignup from './pages/UserSignup.jsx'


const App = () => {
  return (
    
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/Captain-login' element={<CaptainLogin/>}/>
        <Route path='/Captain-signup' element={<CaptainSignup/>}/>
        <Route path='/Login'element={<UserLogin/>}/>
        <Route path='/Signup' element={<UserSignup/>}/>
      </Routes>

  )
}

export default App
