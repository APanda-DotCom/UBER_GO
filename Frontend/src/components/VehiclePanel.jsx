import React from 'react'
import { FiChevronDown } from "react-icons/fi";

import UberXL from '../assets/UberXL_Black_v2.png';
import UberMotorCycle from '../assets/motorcycle.png';
import UberCar from '../assets/car.png';
import UberAuto from '../assets/auto.png';
import { FaUser } from "react-icons/fa";

const VehiclePanel = (props) => {
  return (
    <div>
         
<h5 onClick={()=>{ 
              props.setVehiclePanel(false)
            }}className="absolute top-4 left-1/2 -translate-x-1/2 text-3xl " >
            <FiChevronDown />
           </h5>

            <h3 className='text-2xl font-semibold mb-5 mt-5'>Choose a vehicle</h3>
            <div onClick={()=>{
              props.setConfirmRidePanel(true)
            }}className='flex border-2  active:border-black rounded-xl w-full p-3 mt-2 items-center'>
              <img className='h-16'src={UberCar} alt="UberXL_Black_van"/>
              <div className='ml-2 w-1/2'>
              <h4 className='font-medium text-base flex gap-2 '> UberGo <span className='flex gap-2'><FaUser/>4</span></h4>
              <h5 className='font-medium text-sm'>2 mins away</h5>
              <p className='font-normal text-xs text-gray-600'>Affordable,compact rides</p>

              </div>
              <h2 className='text-lg font-semibold flex' >₹193.20</h2>
            </div>
           
            <div onClick={()=>{
              props.setConfirmRidePanel(true)
            }}className='flex border-2  active:border-black rounded-xl w-full p-3 mt-2 items-center'>
              <img className='h-16'src={UberMotorCycle} alt="UberXL_Black_van"/>
              <div className='ml-2 w-1/2'>
              <h4 className='font-medium text-base flex gap-2 '> UberGo <span className='flex gap-2'><FaUser/>1</span></h4>
              <h5 className='font-medium text-sm'>3 mins away</h5>
              <p className='font-normal text-xs text-gray-600'>Affordable motorcycle rides</p>

              </div>
              <h2 className='text-lg font-semibold flex' >₹65.20</h2>
            </div>
             <div onClick={()=>{
              props.setConfirmRidePanel(true)
             }}className='flex border-2  active:border-black rounded-xl w-full p-3 mt-2 items-center'>
              <img className='h-16'src={UberAuto} alt="UberXL_Black_van"/>
              <div className='ml-2 w-1/2'>
              <h4 className='font-medium text-base flex gap-2 '> UberGo <span className='flex gap-2'><FaUser/>3</span></h4>
              <h5 className='font-medium text-sm'>2 mins away</h5>
              <p className='font-normal text-xs text-gray-600'>Affordable compact rides</p>

              </div>
              <h2 className='text-lg font-semibold flex' >₹110.20</h2>
            </div>
             <div onClick={()=>{
              props.setConfirmRidePanel(true)
             }} className='flex border-2  active:border-black rounded-xl w-full p-3 mt-2 items-center'>
              <img className='h-20'src={UberXL} alt="UberXL_Black_van"/>
              <div className='ml-2 w-1/2'>
              <h4 className='font-medium text-base flex gap-2 '> UberGo <span className='flex gap-2'><FaUser/>4</span></h4>
              <h5 className='font-medium text-sm'>2 mins away</h5>
              <p className='font-normal text-xs text-gray-600'>Premier</p>

              </div>
              <h2 className='text-lg font-semibold flex' >₹293.20</h2>
              </div>
            </div>
  )
}

export default VehiclePanel
