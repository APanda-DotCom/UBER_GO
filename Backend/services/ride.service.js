const rideModel = require('../models/ride.model');
const mapService = require('./maps.service');

async function getFare(pickup, destination) {
  if (!pickup || !destination) {
    throw new Error('pickup and destination are required');
  }

  const distanceTime = await mapService.getDistanceTime(pickup, destination);

  const baseFare = {
    auto: 30,
    car: 50,
    motorcycle: 20
  };

  const perKmRate = {
    auto: 10,
    car: 15,
    motorcycle: 8
  };

  const perMinuteRate = {
    auto: 2,
    car: 3,
    motorcycle: 1.5
  };

  return {
    auto:
      baseFare.auto +
      distanceTime.distance * perKmRate.auto +
      distanceTime.time * perMinuteRate.auto,

    car:
      baseFare.car +
      distanceTime.distance * perKmRate.car +
      distanceTime.time * perMinuteRate.car,

    motorcycle:
      baseFare.motorcycle +
      distanceTime.distance * perKmRate.motorcycle +
      distanceTime.time * perMinuteRate.motorcycle
  };
}

module.exports.createRide = async ({
  userId,
  pickup,
  destination,
  vehicleType
}) => {
  if (!userId || !pickup || !destination || !vehicleType) {
    throw new Error('All fields are required');
  }

  const fare = await getFare(pickup, destination);

  const ride = await rideModel.create({
    user: userId,
    pickup,
    destination,
    vehicleType,
    fare: fare[vehicleType]
  });

  return ride;
};