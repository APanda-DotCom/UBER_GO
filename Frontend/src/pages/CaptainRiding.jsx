import React from 'react'
import LocationGif from '../assets/Location.gif'
import Logo from "../assets/uber-driver-svgrepo-com.svg"
import { Link } from 'react-router-dom'
import { IoLogOutOutline } from "react-icons/io5";
import { FiChevronDown } from "react-icons/fi";

const CaptainRiding = () => {
  return (
     <div className="h-screen relative bg-white">

  {/* Logout Button */}
  <Link
    to="/home"
    className="fixed right-4 top-4 h-12 w-12 
               flex items-center justify-center 
               rounded-full bg-white text-black 
               shadow-lg shadow-black/30
               transition-all duration-300
               hover:scale-110 hover:bg-slate-700
               hover:text-white
               active:scale-95 z-50"
  >
    <IoLogOutOutline className="text-xl" />
  </Link>

  {/* Top Image Section */}
  <div className="h-4/5 relative">
    <img
      className="h-full w-full object-cover"
      src={LocationGif}
      alt="location"
    />

    {/* Logo */}
    <img
      className="w-16 absolute left-5 top-5"
      src={Logo}
      alt="Uber Logo"
    />
  </div>
  <div className="relative h-[20vh] p-6 flex items-center justify-between bg-yellow-400">

  {/* Center Down Arrow */}
  <h5
    onClick={() => {}}
    className="absolute top-2 left-1/2 -translate-x-1/2
               text-3xl text-gray-900 cursor-pointer
               hover:text-gray-600 transition-colors z-10"
  >
    <FiChevronDown />
  </h5>

  {/* Distance */}
  <h4 className="text-xl font-bold">4 km away</h4>

  {/* Action Button */}
  <button
    className="bg-green-700 hover:bg-green-400
               text-white font-semibold px-10 py-3 rounded-lg
               transition-colors duration-200"
  >
    Complete Ride
  </button>

</div>


       

    </div>
  )
}

export default CaptainRiding
