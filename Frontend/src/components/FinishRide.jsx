import React from "react";
import { GiCash } from "react-icons/gi";
import { RiArrowDownWideFill } from "react-icons/ri"
import { MdOutlineLocationOn } from "react-icons/md";
import { RiUserLocationLine } from "react-icons/ri";
import Riderimage from "../assets/images.jpg";
import { Link } from 'react-router-dom'

const FinishRide = (props) => {
  

  return (
    <div >
      
      {/* Close Chevron */}
      <h5
        onClick={() => props.setFinishRidePanel(false)}
        className="absolute top-3 left-1/2 -translate-x-1/2 
                   text-3xl text-gray-400 cursor-pointer 
                   hover:text-gray-600 transition-colors"
      >
        < RiArrowDownWideFill/>
      </h5>

      {/* Heading */}
      <h3 className="text-2xl font-semibold mb-6 mt-5">
        Finish this ride..❤️...
      </h3>

      {/* Rider Info */}
      <div className="flex items-center justify-between bg-yellow-500 p-4 rounded-xl">
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

        <h5 className="text-xl font-semibold text-black">
          4.4 km
        </h5>
      </div>

      {/* Ride Details */}
      <div className="flex-1 mt-3">
        <div className="flex items-center gap-3 p-2 border-b-2 border-gray-200">
          <RiUserLocationLine className="text-xl text-blue-600 flex-shrink-0" />
          <div>
            <h3 className="text-base font-medium">562/11-A</h3>
            <p className="text-xs text-gray-600">
              5th Main Rd, Marathahalli, Kasavanahalli, Bengaluru
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-2 border-b-2 border-gray-200">
          <MdOutlineLocationOn className="text-xl text-red-600 flex-shrink-0" />
          <div>
            <h3 className="text-base font-medium">562/11-A</h3>
            <p className="text-xs text-gray-600">
              5th Main Rd, Marathahalli, Kasavanahalli, Bengaluru
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-2">
          <GiCash className="text-xl text-green-600 flex-shrink-0" />
          <div>
            <h3 className="text-base font-medium">₹193.20</h3>
            <p className="text-xs text-gray-600">Cash</p>
          </div>
        </div>
      </div>
         <div className="mt-4 mb-4 px-4">
  <Link
    to="/captain-home"
    className="block text-center w-full 
               bg-green-600 hover:bg-green-700 
               text-white font-semibold 
               py-2 rounded-md 
               transition active:scale-95"
  >
    Finish Ride
  </Link>
</div>

      
    </div>
  );
};

export default FinishRide;
