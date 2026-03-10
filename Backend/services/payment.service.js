const Razorpay = require('razorpay');
const crypto = require('crypto');
const Payment = require('../models/payment.model');
const rideModel = require('../models/ride.model');
const captainModel = require("../models/captain.model");
const { sendMessageToSocketId } = require("../socket");



const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

/**
 * ================================
 * CREATE RAZORPAY ORDER
 * ================================
 */
module.exports.createOrder = async ({ rideId, userId }) => {
  const ride = await rideModel.findById(rideId);
  if (!ride) throw new Error('Ride not found');

  // (optional but recommended)
  if (ride.user.toString() !== userId.toString()) {
    throw new Error('Unauthorized payment attempt');
  }
console.log(ride)
  const options = {
    amount: ride.fare * 100, // INR → paise
    currency: 'INR',
    receipt: `ride_${rideId}`,
  };

  const order = await razorpay.orders.create(options);

  await Payment.create({
    ride: rideId,
    user: userId,
    captain: ride.captain,
    amount: ride.fare,
    razorpayOrderId: order.id,
    status: 'created',
  });

  return {
  orderId: order.id,   
};
};

/**
 * ================================
 * VERIFY PAYMENT
 * ================================
 */

module.exports.verifyPayment = async ({
  razorpayOrderId,
  razorpayPaymentId,
  razorpaySignature,
}) => {
  // 1️⃣ Verify Razorpay signature
  const generatedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(`${razorpayOrderId}|${razorpayPaymentId}`)
    .digest("hex");

  if (generatedSignature !== razorpaySignature) {
    throw new Error("Invalid payment signature");
  }

  // 2️⃣ Update payment
  const payment = await Payment.findOneAndUpdate(
    { razorpayOrderId },
    {
      razorpayPaymentId,
      razorpaySignature,
      status: "paid",
    },
    { new: true }
  );

  if (!payment) throw new Error("Payment record not found");

  // 3️⃣ Mark ride as paid
  const ride = await rideModel.findByIdAndUpdate(
    payment.ride,
    { paymentStatus: "paid" },
    { new: true }
  );

  // 4️⃣ Find captain
  const captain = await captainModel.findById(ride.captain);
  if (captain?.socketId) {
    //  SEND SOCKET EVENT TO CAPTAIN
    sendMessageToSocketId(captain.socketId, {
  event: "payment-success",
  data: {
    rideId: ride._id,
    amount: ride.fare,
  },
});
  }

  return payment;
};

/**
 * ================================
 * CASH PAYMENT (REQUIRED)
 * ================================
 */
module.exports.createCashPayment = async ({ rideId, userId }) => {
  const ride = await rideModel.findById(rideId);
  if (!ride) throw new Error('Ride not found');

  const payment = await Payment.create({
    ride: rideId,
    user: userId,
    captain: ride.captain,
    amount: ride.fare,
    method: 'cash',
    status: 'paid',
  });

  await rideModel.findByIdAndUpdate(rideId, {
    paymentStatus: 'paid',
  });

  return payment;
};
