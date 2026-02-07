const { validationResult } = require('express-validator');
const paymentService = require('../services/payment.service');

/**
 * CREATE PAYMENT ORDER (ONLINE)
 */
module.exports.createOrder = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
   

  const { rideId } = req.body;

  try {
    const result = await paymentService.createOrder({
      rideId,
      userId: req.user._id,
    });

    return res.status(201).json(result);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

/**
 * VERIFY PAYMENT
 */
module.exports.verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    console.log("VERIFY BODY:", req.body);

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature
    ) {
      return res.status(400).json({ message: "Missing Razorpay fields" });
    }

    const payment = await paymentService.verifyPayment({
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      razorpaySignature: razorpay_signature,
    });
  
    return res.status(200).json(payment);
  } catch (err) {
    console.error("VERIFY ERROR:", err.message);
    return res.status(400).json({ message: err.message });
  }
};

/**
 * CASH PAYMENT
 */
module.exports.cashPayment = async (req, res) => {
  const { rideId } = req.body;

  try {
    const payment = await paymentService.createCashPayment({
      rideId,
      userId: req.user._id,
    });

    return res.status(201).json(payment);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};
