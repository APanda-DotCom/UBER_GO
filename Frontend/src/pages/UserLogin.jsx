import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import UberLogo from '../assets/uber-seeklogo.svg'

const UserLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [userData, setUserData] = useState({})

  const handlerSubmit = (e) => {
    e.preventDefault()

    const data = { email, password }
    setUserData(data)
    console.log(userData)

    setEmail('')
    setPassword('')
  }

  return (
    <div className="p-7 h-screen flex flex-col justify-between bg-white">
      
      <div>
        <img
          className="w-16 mb-12"
          src={UberLogo}
          alt="Uber Logo"
        />

        <form onSubmit={handlerSubmit}>
        
          <h3 className="text-lg font-semibold mb-2">
            What's your email
          </h3>

          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@example.com"
            className="bg-gray-100 mb-6 rounded-lg px-4 py-3 border w-full text-base
                       focus:outline-none focus:ring-2 focus:ring-black"
          />

        
          <h3 className="text-lg font-semibold mb-2">
            Enter Password
          </h3>

          <div className="relative mb-7">
            <input
              required
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="bg-gray-100 rounded-lg px-4 py-3 pr-14 border w-full text-base
                         focus:outline-none focus:ring-2 focus:ring-black"
            />

            
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer
                         text-gray-500 hover:text-black hover:bg-gray-200
                         p-1 rounded-full transition-all duration-200"
            >
              {showPassword ? (
                <FaEyeSlash size={20} />
              ) : (
                <FaEye size={20} />
              )}
            </span>
          </div>

          
          <button
            className="bg-slate-950 text-white rounded-lg font-semibold mb-6
                       px-4 py-3 w-full text-lg hover:bg-slate-500 transition"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-600">
          New User?{' '}
          <Link
            to="/signup"
            className="text-blue-600 font-medium hover:underline"
          >
            Create new account
          </Link>
        </p>
      </div>

      
      <Link
        to="/captain-login"
        className="bg-purple-600 text-white rounded-lg font-semibold
                   px-4 py-3 w-full text-center text-lg
                   hover:bg-purple-400 transition"
      >
        Sign in as Captain
      </Link>
    </div>
  )
}

export default UserLogin
