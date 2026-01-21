import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GiCash } from "react-icons/gi";
import { RiArrowDownWideFill } from "react-icons/ri";
import { MdOutlineLocationOn } from "react-icons/md";
import { RiUserLocationLine } from "react-icons/ri";
import Riderimage from "../assets/images.jpg";

const ConfirmRidePopUp = (props) => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    // OTP verified → move to next page
    navigate("/captain-riding");
  };

  return (
    <div className="relative min-h-screen w-full bg-white flex flex-col overflow-y-auto px-4 pb-6">
      
      {/* Close */}
      <h5
        onClick={() => props.setConfirmRidePopUpPanel(false)}
        className="absolute top-1 left-1/2 -translate-x-1/2 
                   text-3xl text-gray-400 cursor-pointer"
      >
        < RiArrowDownWideFill/>
      </h5>

      <h3 className="text-2xl font-semibold mb-6 mt-10">
        Confirm this ride to start
      </h3>

      {/* Rider Info */}
      <div className="flex items-center justify-between bg-gray-300 p-4 border-spacing-1 rounded-xl">
        <div className="flex items-center gap-4">
          <img
            className="h-16 w-16 rounded-full object-cover border-2 border-white"
            src={Riderimage}
            alt="Captain"
          />
          <h4 className="text-lg font-medium">Aisha Mishra</h4>
        </div>
        <h5 className="text-xl font-semibold">4.4 km</h5>
      </div>

      {/* Details */}
      <div className="flex-0 mt-4">
        <div className="flex items-center gap-3 p-2 border-b">
          <RiUserLocationLine className="text-xl text-blue-600" />
          <div>
            <h3 className="font-medium">562/11-A</h3>
            <p className="text-xs text-gray-600">
              5th Main Rd, Marathahalli, Bengaluru
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-2 border-b">
          <MdOutlineLocationOn className="text-xl text-red-600" />
          <div>
            <h3 className="font-medium">562/11-A</h3>
            <p className="text-xs text-gray-600">
              5th Main Rd, Marathahalli, Bengaluru
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-2">
          <GiCash className="text-xl text-green-600" />
          <div>
            <h3 className="font-medium">₹193.20</h3>
            <p className="text-xs text-gray-600">Cash</p>
          </div>
        </div>
      </div>

      {/* OTP Form */}
      <form onSubmit={submitHandler} className="mt-2">
        <input
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="bg-[#eeeeee] px-4 py-2 text-lg rounded-lg w-full"
          type="text"
          placeholder="Enter OTP"
          required
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white font-semibold 
                     py-2.5 rounded-lg mt-5 active:scale-95"
        >
          Confirm
        </button>

        <button
          type="button"
          onClick={() => {
            props.setConfirmRidePopUpPanel(false);
            props.setRidePopUpPanel(false);
          }}
          className="w-full bg-red-600 text-white font-semibold 
                     py-2.5 rounded-lg mt-3 active:scale-95"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default ConfirmRidePopUp;
