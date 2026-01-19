import LocationGif from '../assets/Location.gif'
import Logo from "../assets/uber-driver-svgrepo-com.svg"
import { Link } from 'react-router-dom'
import { IoLogOutOutline } from "react-icons/io5";
import CaptainDetails from "../components/CaptainDetails"
import RidePopUp from '../components/RidePopUp';
import React, { useState, useRef } from 'react'
import gsap from "gsap";
import {useGSAP} from '@gsap/react';
import ConfirmRidePopUp from "../components/ConfirmRidePopUp";
import { FiChevronDown } from "react-icons/fi";


const CaptainHome = () => {

const[confirmRidePopUpPanel,setConfirmRidePopUpPanel]=useState(false);
const[ridePopUpPanel,setRidePopUpPanel]= useState(true)
 const ridePopUpPanelRef= useRef(null)
 const confirmRidePopUpPanelRef= useRef(null)
  


  useGSAP(function() {
    if (ridePopUpPanel) {
       gsap.to(ridePopUpPanelRef.current, {
          transform:'translatey(0)'
      })
   }else {
      gsap.to(ridePopUpPanelRef.current, {
         transform:'translatey(100%)'
      })
    }
     }, [ridePopUpPanel]);

  useGSAP(function() {
    if (confirmRidePopUpPanel) {
       gsap.to(confirmRidePopUpPanelRef.current, {
          transform:'translatey(0)'
      })
   }else {
      gsap.to(confirmRidePopUpPanelRef.current, {
         transform:'translatey(100%)'
      })
    }
     }, [confirmRidePopUpPanel]);



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
  <div className="h-3/5 relative">
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

  {/* Bottom Content Section */}
  <div className="h-2/5 p-6">
     
     <CaptainDetails/>
    
  </div>
   
   <div ref={ridePopUpPanelRef}className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-8"> 
     <RidePopUp  setRidePopUpPanel={setRidePopUpPanel} setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}/>
    </div>
    <div ref={confirmRidePopUpPanelRef}className="fixed w-full z-10 h-screen w-screen bottom-0 translate-y-full bg-white px-3 py-8"> 
     <ConfirmRidePopUp  setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}  setRidePopUpPanel={setRidePopUpPanel}/>
    </div>
</div>


  )
}
  gsap.registerPlugin(useGSAP);
 
export default CaptainHome
