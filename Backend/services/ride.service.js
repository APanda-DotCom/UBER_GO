const rideModel = require('../models/ride.model');
const mapService = require('./maps.service');
const crypto = require('crypto');

/**
 * Generate OTP of given length
 */
function getOtp(length) {
  return crypto.randomInt(Math.pow(10, length - 1), Math.pow(10, length)).toString();
}

/**
 * Calculate fare based on distance and duration
 */
async function getFare(pickup, destination) {
  if (!pickup || !destination) throw new Error('Pickup and destination are required');

  const distanceTime = await mapService.getDistanceTime(pickup, destination);

  if (!distanceTime || !distanceTime.distance || !distanceTime.duration) {
    throw new Error('Invalid distance/time data from API');
  }
     console.log(distanceTime); 
  const baseFare = { auto: 30, car: 50, carXL: 80, motorcycle: 20 };
  const perKmRate = { auto: 10, car: 15, carXL: 25, motorcycle: 8 };
  const perMinuteRate = { auto: 2, car: 3, carXL: 6, motorcycle: 1.5 };

  const km = distanceTime.distance.value / 1000; // meters → km
  const minutes = distanceTime.duration.value / 60;

  return {
    auto: Math.round(baseFare.auto + km * perKmRate.auto + minutes * perMinuteRate.auto),
    car: Math.round(baseFare.car + km * perKmRate.car + minutes * perMinuteRate.car),
    carXL: Math.round(baseFare.carXL + km * perKmRate.carXL + minutes * perMinuteRate.carXL),
    motorcycle: Math.round(baseFare.motorcycle + km * perKmRate.motorcycle + minutes * perMinuteRate.motorcycle)
  };
}

/**
 * Create a new ride
 */
module.exports.createRide = async ({ user, pickup, destination, vehicleType }) => {
  if (!user || !pickup || !destination || !vehicleType) {
    throw new Error('All fields are required');
  }

  const fare = await getFare(pickup, destination);

  console.log(fare)

  const ride = await rideModel.create({
    user,
    pickup,
    destination,
    vehicleType,
    fare: fare[vehicleType],
    otp: getOtp(4),
    status: 'pending'
  })
const populatedRide = await rideModel
    .findById(ride._id)
    .populate('user', 'fullname socketId');

  return populatedRide;
};

/**
 * Confirm ride (Captain)
 */
module.exports.confirmRide = async ({ rideId, captainId }) => {
  if (!rideId || !captainId) throw new Error('rideId and captainId are required');

  const ride = await rideModel.findByIdAndUpdate(
    rideId,
    { captain: captainId, status: 'accepted' },
    { new: true }
  ).populate('user').populate('captain').select('+otp');

  if (!ride) throw new Error('Ride not found');
  return ride;
};

/**
 * Start ride (Captain + OTP)
 */
module.exports.startRide = async ({ rideId, otp, captain }) => {
  if (!rideId || !otp || !captain) throw new Error('rideId, otp, and captain are required');

  const ride = await rideModel.findById(rideId).populate('user').populate('captain').select('+otp');
  if (!ride) throw new Error('Ride not found');
  if (ride.status !== 'accepted') throw new Error('Ride not accepted yet');
  if (ride.otp !== otp) throw new Error('Invalid OTP');

  ride.status = 'ongoing';
  await ride.save();

  return ride;
};

/**
 * End ride
 */
module.exports.endRide = async ({ rideId, captain }) => {
  if (!rideId || !captain) throw new Error('rideId and captain are required');

  const ride = await rideModel
    .findOne({ _id: rideId, captain })   // ✅ FIXED
    .populate('user').populate('captain').populate('otp');

  if (!ride){ 
    
  throw new Error('Ride not found');
}
  if (ride.status !== 'ongoing')
    { throw new Error('Ride is not ongoing');
  }
await rideModel.findOneAndUpdate({
  _id: rideId
},{
  status:'completed'
})
  return ride;
};


module.exports.getFare = getFare;
module.exports.getOtp = getOtp;
