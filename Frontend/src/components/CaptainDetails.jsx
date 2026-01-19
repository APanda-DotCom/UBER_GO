import React from 'react'

import captainimage from "../assets/cartoon-image_15453852.png"
import { GiTimeBomb } from "react-icons/gi";
import { SiPagespeedinsights } from "react-icons/si";
import { LuNotebookPen } from "react-icons/lu";
import { LuIndianRupee } from "react-icons/lu";



const CaptainDetails = () => {
  return (
    <div>
      {/* Profile + Earnings */}
    <div className="flex items-center justify-between mb-6">

      {/* Profile */}
      <div className="flex items-center gap-4">
        <img
          className="h-16 w-16 rounded-full bg-lime-500 object-cover"
          src={captainimage}
          alt="Captain"
        />
        <h4 className="text-lg font-medium">Ashutosh Panda</h4>
      </div>

      {/* Earnings */}
      <div className="text-right">
        <h4 className="text-xl font-semibold flex items-center gap-1 justify-end">
          <LuIndianRupee />
          295.20
        </h4>
        <p className="text-sm text-gray-600">Earned</p>
      </div>
    </div>

    {/* Stats */}
    <div className="flex p-3 mt-6 bg-gray-100 rounded-3xl justify-around text-center">

      <div>
        <GiTimeBomb className="text-3xl mx-auto mb-2" />
        <h5 className="text-lg font-medium">10.2</h5>
        <p className="text-sm text-gray-600">Hours </p>
      </div>

      <div>
        <SiPagespeedinsights className="text-3xl mx-auto mb-2" />
        <h5 className="text-lg font-medium">10.2</h5>
        <p className="text-sm text-gray-600">Speed</p>
      </div>

      <div>
        <LuNotebookPen className="text-3xl mx-auto mb-2" />
        <h5 className="text-lg font-medium">10.2</h5>
        <p className="text-sm text-gray-600">Trips</p>
      </div>

    </div>
    </div>
  )
}

export default CaptainDetails
