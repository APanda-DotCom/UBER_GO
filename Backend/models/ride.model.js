const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },

  captain: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'captain', 
  },

  pickup: {
    type: String,
    required: true,
  },

  destination: {
    type: String,
    required: true,
  },

  fare: {
    type: Number,
    required: true,
  },

  status: {
    type: String,
    enum: ['pending', 'accepted', 'ongoing', 'completed', 'cancelled'],
    default: 'pending',
  },

  duration: Number,
  distance: Number,

  paymentId: String,
  orderId: String,
  signature: String,

  otp: {
    type: String,
    select: false,
    required: true,
  }
});

module.exports = mongoose.model('Ride', rideSchema);
