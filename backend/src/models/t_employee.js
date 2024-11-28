const mongoose = require("mongoose");

// Define the Schema
const employee = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobileNo: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  course: {
    type: [String],
  },
  imgUpload: {
    type: String,
    required: false,
    default: null,
  },
  createdAt: { type: Date, default: Date.now },
});

const t_employee = mongoose.model("t_employee", employee);

module.exports = t_employee;
