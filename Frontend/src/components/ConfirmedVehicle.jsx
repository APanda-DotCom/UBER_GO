import React from 'react'
import { FiChevronDown } from "react-icons/fi";
import UberXL from '../assets/UberXL_Black_v2.png';
import UberMotorCycle from '../assets/motorcycle.png';
import UberCar from '../assets/car.png';
import UberAuto from '../assets/auto.png';
import { MdOutlineLocationOn } from "react-icons/md";
import { RiUserLocationLine } from "react-icons/ri";
import { GiCash } from "react-icons/gi";

const ConfirmedVehicle = (props) => {
  return (
    <div>
      <h5 onClick={()=>{
        props.setConfirmRidePanel(false)
      }}className="absolute top-4 left-1/2 -translate-x-1/2 text-3xl "><FiChevronDown /> </h5>
      <h3 className=" text-2xl font-semibold mb-5 mt-6">Confirm your Ride</h3>
      <div className="flex gap-2 justify-between flex-col items-center">
        <img className='h-20' src={UberCar} alt="uber-car-logo" />
          
           <div className='w-full'>
            <div  className='flex items-center gap-5 p-3 border-b-2'>
                <RiUserLocationLine />
                <div>
                    <h3 className="text-lg font-medium">562/11-A</h3>
                    <p className="text-sml mt-1 text-gray-600">5th Main Rd, Marathahalli, Kasavanahalli, Bengaluru, Karnataka 560037</p>
                </div>
            </div>
            <div  className='flex items-center gap-5 p-3 border-b-2'>
                <MdOutlineLocationOn/>
                <div>
                    <h3 className="text-lg font-medium">562/11-A</h3>
                    <p className="text-sml mt-1 text-gray-600">5th Main Rd, Marathahalli, Kasavanahalli, Bengaluru, Karnataka 560037</p>
                </div>
            </div>
            <div  className='flex items-center gap-5 p-3 border-b-2'>
                <GiCash />
                <div>
                    <h3 className="text-lg font-medium">193.20</h3>
                    <p className="text-sml mt-1 text-gray-600">Cash Cash</p>
                </div>
            </div>
           </div>
        
       <div></div>
      </div>
      <button className="w-full bg-green-400 text-white p-3">Confirm</button>
    </div>
  )
}

export default ConfirmedVehicle
