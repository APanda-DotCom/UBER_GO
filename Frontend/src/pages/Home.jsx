import React from 'react'
import { Link } from 'react-router-dom'
import  UberLogo from '../assets/uber-seeklogo.svg'
import { CgArrowLongRight } from "react-icons/cg";


const Home = () => {
  return (
    <div>
  <div className='bg-cover bg-center bg-[url("/src/assets/uber1.jpg")] h-screen pt-8 flex flex-col justify-between w-full'>

    <img
      className='w-20 ml-8'
      src={UberLogo}
      alt="Uber Logo"
    />

  
    <div className='bg-white pb-7 py-4 px-4 rounded-t-2xl'>
      <h2 className='text-3xl font-bold ml-5'>
        Get Started with Uber
      </h2>

      <Link
  to="/login"
  className="relative flex items-center w-full bg-black text-white py-3 px-5 rounded-xl mt-4"
>

  <span className="absolute left-1/2 -translate-x-1/2 text-xl font-semibold">
    Continue
  </span>

  
  <CgArrowLongRight className="ml-auto text-3xl" />
</Link>

    </div>

  </div>
</div>


  )
}

export default Home
