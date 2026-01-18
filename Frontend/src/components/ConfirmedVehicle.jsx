import React from 'react'
import { FiChevronDown } from "react-icons/fi";
import UberXL from '../assets/UberXL_Black_v2.png';
import UberMotorCycle from '../assets/motorcycle.png';
import UberCar from '../assets/car.png';
import UberAuto from '../assets/auto.png';
import { MdOutlineLocationOn } from "react-icons/md";
import { RiUserLocationLine } from "react-icons/ri";
import { GiCash } from "react-icons/gi";
import LookingForDriver from '../components/LookingForDriver'

const ConfirmedVehicle = (props) => {
  return (
    <div>
      <h5 
        onClick={() => {
          props.setConfirmRidePanel(false)
        }}
        className="absolute top-3 left-1/2 -translate-x-1/2 text-3xl text-gray-400 cursor-pointer hover:text-gray-600 transition-colors"
      >
        <FiChevronDown />
      </h5>

      <h3 className="text-2xl font-semibold mb-6 mt-3">Confirm your Ride</h3>

      <div className="flex justify-between flex-col items-center">
        <img className='h-28' src={UberCar} alt="uber-car-logo" />
        
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

      <button 
        onClick={() => {
          props.setLookingDriver(true)
        }}
        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 rounded-lg mt-5 transition-all duration-200 active:scale-95"
      >
        Confirm
      </button>
    </div>
  )
}

export default ConfirmedVehicle