import React, { useState, useRef, useContext ,useEffect} from 'react'
import Logo from '../assets/uber-seeklogo.svg'
// import LocationGif from '../assets/Location.gif'
import gsap from "gsap";
import {useGSAP} from '@gsap/react';

import { FiChevronDown } from "react-icons/fi";
import LocationPanel from "../components/LocationPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmedVehicle from '../components/ConfirmedVehicle';
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/WaitingForDriver';
import axios from 'axios';
import { SocketContext } from '../context/socketContext';
import { UserDataContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import LiveTracking from '../components/LiveTracking';


const Home = () => {
  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [panelOpen, setPanelOpen] = useState(false)
  const [pickupSuggestions, setPickupSuggestion] = useState([])
  const [destinationSuggestions, setDestinationSuggestion] = useState([])
  const [activeField, setActiveField] = useState(null)
  const panelRef = useRef(null)
  const vehiclePanelRef = useRef(null)
  const confirmRidePanelRef = useRef(null)
  const  LookingDriverRef = useRef(null)
  const  WaitingDriverRef = useRef(null)
  const panelCloseRef = useRef(null)
  const[vehiclePanel,setVehiclepanel]=useState(false)
  const [confirmRidePanel,setConfirmRidePanel]=useState(false)
  const [LookingDriver,setLookingDriver]=useState(false)
  const [WaitingDriver,setWaitingDriver]=useState(false)
  const [fare,setFare]=useState({})
  const [vehicleType,setVehicleType]= useState(null) 
  
  const[ride,setRide]= useState(null);
 const navigate= useNavigate();
// eslint-disable-next-line no-unused-vars
const {socket}=useContext(SocketContext);
// eslint-disable-next-line no-unused-vars
const {user}=useContext(UserDataContext);

// 1️⃣ Join socket room (ONLY when user & socket exist)
useEffect(() => {
  if (!socket || !user?._id) return;

  socket.emit('join', {
    userType: 'user',
    userId: user._id
  });
}, [socket, user]);


// 2️⃣ Socket listeners (stable + clean)
useEffect(() => {
  if (!socket) return;

  const handleRideConfirmed = (ride) => {
    console.log('ride-confirmed:', ride);
    setRide(ride);                 
    setLookingDriver(false);
    setWaitingDriver(true);
  };

  const handleRideStarted = (ride) => {
    console.log('ride-started:', ride);
    setWaitingDriver(false);
    navigate('/riding', { state: { ride } });
  };

  socket.on('ride-confirmed', handleRideConfirmed);
  socket.on('ride-started', handleRideStarted);

  return () => {
    socket.off('ride-confirmed', handleRideConfirmed);
    socket.off('ride-started', handleRideStarted);
  };
}, [socket, navigate]);



const handelPickupChange = async (e) => {
  const value = e.target.value;
  setPickup(value);
  setActiveField('pickup');

  if (value.length < 3) return;

  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
      {
        params: { input: value },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    );
    setPickupSuggestion(response.data);
  } catch (err) {
    console.log("error fetching pickup suggestions", err.response?.data);
  }
};


const handelDestinationChange = async (e) => {
  setDestination(e.target.value)
  setActiveField('destination');

  if (e.target.value.length < 3) return

  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
      {
        params: { input: e.target.value },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    )
    setDestinationSuggestion(response.data)
  } catch {
    console.log("error fetching destination suggestions")
  }
}




  // eslint-disable-next-line no-unused-vars
  const handleSelectLocation = (location) => {
    if (activeField === 'pickup') {
      setPickup(location)
    } else if (activeField === 'destination') {
      setDestination(location)
    }
    setPickupSuggestion([])
    setDestinationSuggestion([])
  }






  const handlerSubmit = (e) => {
    e.preventDefault()
  }
  
  
  useGSAP(function() {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: '70%',
        padding: '0'
        // opacity:1
      })
      gsap.to(panelCloseRef.current,{
         opacity:1
      })
    } else {
      gsap.to(panelRef.current, {
        height: '0%',
        // opacity:1
      })
      gsap.to(panelCloseRef.current,{
         opacity:0
      })
    }
  }, [panelOpen]);

  useGSAP(function(){
    if(vehiclePanel){
      gsap.to(vehiclePanelRef.current,{
           transform:'translatey(0)'
     }) 
    }else{
     gsap.to(vehiclePanelRef.current,{
          transform:'translatey(100%)'
     })
    }
  } ,[vehiclePanel])

  useGSAP(function(){
    if(confirmRidePanel){
      gsap.to(confirmRidePanelRef.current,{
           transform:'translatey(0)'
     }) 
    }else{
     gsap.to(confirmRidePanelRef.current,{
          transform:'translatey(100%)'
     })
    }
  } ,[confirmRidePanel])

  useGSAP(function(){
    if(LookingDriver){
      gsap.to(LookingDriverRef.current,{
           transform:'translatey(0)'
     }) 
    }else{
     gsap.to(LookingDriverRef.current,{
          transform:'translatey(100%)'
     })
    }
  } ,[LookingDriver])

  useGSAP(function(){
    if(WaitingDriver){
      gsap.to(WaitingDriverRef.current,{
           transform:'translatey(0)'
     }) 
    }else{
     gsap.to(WaitingDriverRef.current,{
          transform:'translatey(100%)'
     })
    }
  } ,[WaitingDriver])


  async function findTrip(){
    setVehiclepanel(true)
    setPanelOpen(false)

    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
        params: {
          pickup,
          destination
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      setFare(response.data)
    } catch (error) {
      console.log("Error fetching fare:", error.response?.data || error.message)
    }
  }


  async function createRide() {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/create`,
      { pickup, destination, vehicleType },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    );

    console.log("Ride created successfully", res.data);
  } catch (err) {
    console.log('Error creating ride:', err.response?.data || err.message);
  }
}


  return (
    <div className='h-screen overflow-hidden relative'>
      <img className='w-16 absolute left-5 top-5'
         src={Logo}
         alt="Uber Logo"
      />
      <div onClick={()=>{
        setVehiclepanel(false)
      }}className="h-4/5">
        {/* <img className="h-full w-full object-cover"
          src={LocationGif}
          alt="location" 
        /> */}
       <LiveTracking/>
      </div>
     
      <div className="flex flex-col justify-end h-screen absolute top-0 w-full">
        <div className='h-[40%] p-6 bg-white relative'>
          <h5 ref={panelCloseRef}onClick={()=>
            setPanelOpen(false)
          }className="absolute right-3 top-3 text-3xl rounded-full p-1">
            <FiChevronDown  />
          </h5>
          <h4 className="text-2xl font-semibold">Find a trip</h4>
          <form onSubmit={handlerSubmit}>
            <div className='line absolute h-16 w-1 top-[38%] left-10 bg-gray-900 rounded-full'/>
            <input className='bg-[#eeeeee] px-8 py-2 text-lg rounded-lg w-full mt-5'
              type="text" 
              onClick={() => setPanelOpen(true)}
              value={pickup}
              onChange={handelPickupChange}
              placeholder="Add a pick-up Location" 
            />
            <input className='bg-[#eeeeee] px-8 py-2 text-lg rounded-lg w-full mt-5'
              type="text" 
              onClick={() => {
                setPanelOpen(true)
                setActiveField('destination')
              }}
               value={destination}
              onChange={handelDestinationChange}
              placeholder="Enter your Destination"
            />
          </form>

          <button  onClick={findTrip} className="w-full mt-4  bg-black text-white py-2 rounded-lg
                       font-semibold text-base hover:bg-gray-900 transition">Find Trip</button>
        </div>
        <div ref={panelRef} className='bg-white overflow-y-auto px-2 py-2'>
          <LocationPanel 
            suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
            activeField={activeField}
            setPickup={setPickup}
            setDestination={setDestination}
            setVehiclePanel={setVehiclepanel}
            setPanelOpen={setPanelOpen}
            setPickupSuggestion={setPickupSuggestion}
            setDestinationSuggestion={setDestinationSuggestion}
             onSelect={handleSelectLocation}
          /> 
        </div> 
          <div ref={vehiclePanelRef}className='fixed w-full z-10 bottom-0 translate-y-full  bg-white px-3 py-8'>
            <VehiclePanel 
            selectVehicle={setVehicleType}
            fare={fare} setConfirmRidePanel={setConfirmRidePanel}setVehiclePanel={setVehiclepanel}/>

          </div>
            <div ref={confirmRidePanelRef}className='fixed w-full z-10 bottom-0 translate-y-full  bg-white px-3 py-8'>
            <ConfirmedVehicle 
            createRide={createRide}
            pickup={pickup}
            destination={destination}
            fare={fare}
            vehicleType={vehicleType}
            
            setConfirmRidePanel={setConfirmRidePanel}setLookingDriver={setLookingDriver}/>

          </div>
          <div ref={LookingDriverRef} className="fixed w-full z-10 bottom-0 translate-y-full  bg-white px-3 py-8">
            <LookingForDriver 
            createRide={createRide}
            pickup={pickup}
            destination={destination}
            fare={fare}
            vehicleType={vehicleType} setLookingDriver={setLookingDriver}/>
          </div>
          <div ref={WaitingDriverRef}className="fixed w-full z-10 bottom-0 translate-y-full  bg-white px-3 py-8"> 
            <WaitingForDriver 
            ride={ride}
            setLookingDriver={setLookingDriver}
            setWaitingDriver={setWaitingDriver}
            waitingForDriver={WaitingDriver} />
          </div>
      </div>
    </div>
  )
}

gsap.registerPlugin(useGSAP);

export default Home