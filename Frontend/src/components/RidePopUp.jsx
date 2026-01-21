import React from 'react'
import { GiCash } from "react-icons/gi";
import { RiArrowDownWideFill } from "react-icons/ri";
import { MdOutlineLocationOn } from "react-icons/md";
import { RiUserLocationLine } from "react-icons/ri";
import Riderimage from "../assets/images.jpg"


const RidePopUp = (props) => {

  return (
    <div>
         <h5 
           onClick={() => {
             props.setRidePopUpPanel(false)
           }}
           className="absolute top-3 left-1/2 -translate-x-1/2 text-3xl text-gray-400 cursor-pointer hover:text-gray-600 transition-colors"
         >
           <RiArrowDownWideFill />
         </h5>
   
         <h3 className="text-2xl font-semibold mb-6 mt-3">New Ride Available..!!</h3>
  <div className="flex items-center justify-between bg-yellow-500 p-4 rounded-xl">
  
  {/* Left side: Image + Name */}
  <div className="flex items-center gap-4">
    <img 
      className="h-16 w-16 rounded-full bg-white object-cover border-2 border-white"
      src={Riderimage}
      alt="Captain"
    />
    <h4 className="text-lg font-medium text-black">
      Aisha Mishra
    </h4>
  </div>

  {/* Right side: Distance */}
  <h5 className="text-xl font-semibold text-black">
    4.4 km
  </h5>

</div>

   
         <div className="flex justify-between flex-col items-center">
           <div className='w-full mt-2'>
             <div className='flex items-center gap-3 p-2 border-b-2 border-gray-200'>
               <RiUserLocationLine className="text-xl text-blue-600 flex-shrink-0" />
               <div>
                 <h3 className="text-base font-medium">562/11-A</h3>
                 <p className="text-xs mt-0.5 text-gray-600">5th Main Rd, Marathahalli, Kasavanahalli, Bengaluru</p>
               </div>
             </div>
   
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
         </div>
     <div className="flex mt-5 gap-20">
  <button
    onClick={() => props.setConfirmRidePopUpPanel(true)}
    className="flex-1 bg-black hover:bg-gray-900
               text-white font-semibold py-2.5 rounded-lg
               transition-all duration-200 active:scale-95"
  >
    Accept
  </button>

  <button
    onClick={() => props.setRidePopUpPanel(false)}
    className="flex-1 bg-gray-300 hover:bg-gray-400
               text-black font-semibold py-2.5 rounded-lg
               transition-all duration-200 active:scale-95"
  >
    Ignore
  </button>
</div>
 </div>
  )
}

export default RidePopUp
