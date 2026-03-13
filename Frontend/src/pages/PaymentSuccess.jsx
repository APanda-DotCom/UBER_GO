// import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MdCheckCircle } from "react-icons/md";

// Context to know if user is logged in as user or captain
// Or we can check from route/state

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { amount, rideId, userName, userType } = location.state || {};

  // Determine if this is user or captain viewing
  const isCaptin = userType === "captain";

  return (
    <div className={`min-h-screen flex items-center justify-center ${
      isCaptin ? "bg-blue-50" : "bg-green-50"
    }`}>
      <div className="bg-white rounded-2xl shadow-lg p-8 w-80 text-center">

        {/* Success Icon */}
        <div className="flex justify-center mb-4">
          <div className={`h-16 w-16 rounded-full flex items-center justify-center ${
            isCaptin ? "bg-blue-100" : "bg-green-100"
          }`}>
            <MdCheckCircle className={`text-4xl ${
              isCaptin ? "text-blue-600" : "text-green-600"
            }`} />
          </div>
        </div>

        {/* Title - Different for user and captain */}
        <h2 className="text-2xl font-bold text-gray-800">
          {isCaptin ? "Payment Received! ✅" : "Payment Successful ✅"}
        </h2>

        {/* Subtitle - Different for user and captain */}
        <p className="text-gray-500 text-sm mt-2">
          {isCaptin 
            ? "Rider has completed payment" 
            : "Thank you for your payment"
          }
        </p>

        {/* Payment Details */}
        <div className="bg-gray-100 rounded-lg p-4 mt-5 text-sm space-y-3">
          
          {/* Amount */}
          <div className="flex justify-between items-center">
            <span className="text-gray-600">
              {isCaptin ? "Amount Received" : "Amount Paid"}
            </span>
            <span className={`font-semibold text-lg ${
              isCaptin ? "text-blue-600" : "text-green-600"
            }`}>
              ₹{amount}
            </span>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-300"></div>

          {/* Ride ID */}
          {rideId && (
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Ride ID</span>
              <span className="text-xs font-mono bg-gray-200 px-2 py-1 rounded">
                {rideId}
              </span>
            </div>
          )}

          {/* Rider Name - Only for Captain */}
          {isCaptin && userName && (
            <div className="flex justify-between items-center">
              <span className="text-gray-600">From Rider</span>
              <span className="font-medium text-gray-800">{userName}</span>
            </div>
          )}
        </div>

        {/* Action Button - Different for user and captain */}
        <button
          onClick={() => {
            if (isCaptin) {
              navigate("/captain-home");
            } else {
              navigate("/home");
            }
          }}
          className={`mt-6 w-full text-white py-3 rounded-lg font-semibold 
                     transition-all duration-200 active:scale-95 ${
            isCaptin 
              ? "bg-blue-600 hover:bg-blue-700" 
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {isCaptin ? "Back to Dashboard" : "Go to Home"}
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;