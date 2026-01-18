import React from 'react'
import LocationGif from '../assets/Location.gif'
import Logo from "../assets/uber-seeklogo.svg"
import { FiChevronDown } from "react-icons/fi";
import UberCar from '../assets/car.png';
import { MdOutlineLocationOn } from "react-icons/md";
import { RiUserLocationLine } from "react-icons/ri";
import { GiCash } from "react-icons/gi";
import { TfiHome } from "react-icons/tfi";
import { Link } from 'react-router-dom'


const Riding = () => {
  return (
    <div className='h-screen'>
      <Link
  to="/home"
  className="fixed right-4 top-4 h-12 w-12 
             flex items-center justify-center 
             rounded-full 
             bg-slate-900 text-white 
             shadow-lg shadow-black/30
             transition-all duration-300
             hover:scale-110 hover:bg-slate-700
             active:scale-95"
>
  <TfiHome className="text-xl" />
</Link>



    <div className='h-1/2'>
              <img className="h-full w-full object-cover"
                src={LocationGif}
                alt="location" 
              />
          <div>
     <img className='w-16 absolute left-5 top-5'
              src={Logo}
              alt="Uber Logo"
           />
           </div>
           <div className="h-1/2 p-4">
           <div className="flex items-center  justify-between"> 
                         <img className='h-24' src={UberCar} alt="uber-car-logo" />
                         <div className='text-right'>
                           <h2 className="text-lg font-medium">Ashutosh</h2>
                           <h3 className=" text-xl font-semibold -mt-1 -mb-1">OD 02B5 2324</h3>
                           <p className="text-sm text-gray-600">Maruti Suzuki Wagnor</p>
                         </div>
                       </div>
            <div className='w-full mt-2'>
               <div className='flex items-center gap-3 p-2 border-b-2 border-gray-200'>
                           <MdOutlineLocationOn className="text-xl text-red-600 flex-shrink-0" />
                           <div>
                             <h3 className="text-base font-medium">562/11-A</h3>
                             <p className="text-xs mt-0.5 text-gray-600">5th Main Rd, Marathahalli, Kasavanahalli, Bengaluru</p>
                           </div>
                         </div>
               
                         <div className='flex items-center gap-3 p-2'>
                           <GiCash className="text-xl text-green-600 flex-shrink-0" />
                           <div>
                             <h3 className="text-base font-medium">₹193.20</h3>
                             <p className="text-xs mt-0.5 text-gray-600">Cash Cash</p>
                           </div>
                         </div>
                       </div>
            <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 rounded-lg mt-5 transition-all duration-200 active:scale-95"
      >Make a payment</button>
           </div>
    </div>
    </div>
  )
}

export default Riding
