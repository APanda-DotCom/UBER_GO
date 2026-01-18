import { FiChevronDown } from "react-icons/fi";
import UberCar from '../assets/car.png';
import { MdOutlineLocationOn } from "react-icons/md";
import { RiUserLocationLine } from "react-icons/ri";
import { GiCash } from "react-icons/gi";



const WaitingForDriver = (props) => {
  return (
    <div>
          <h5 
            onClick={() => {
              props.setWaitingDrive(false)
            }}
            className="absolute top-3 left-1/2 -translate-x-1/2 text-3xl text-gray-400 cursor-pointer hover:text-gray-600 transition-colors"
          >
            <FiChevronDown />
          </h5>
    
         <div className="flex items-center  justify-between"> 
              <img className='h-28' src={UberCar} alt="uber-car-logo" />
              <div className='text-right'>
                <h2 className="text-lg font-medium">Ashutosh</h2>
                <h3 className=" text-xl font-semibold -mt-1 -mb-1">OD 02B5 2324</h3>
                <p className="text-sm text-gray-600">Maruti Suzuki Wagnor</p>
              </div>
            </div>
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
      
  )
}

export default WaitingForDriver


