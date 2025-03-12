const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
  email: String,
  otp: String,
  createdAt: { type: Date, expires: 300, default: Date.now }, // OTP expires in 5 minutes
});

const OTP = mongoose.model("OTP", otpSchema);
module.exports = OTP;
