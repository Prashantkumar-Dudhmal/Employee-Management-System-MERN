const mongoose = require("mongoose");

// Define the Schema
const employee = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Ensures the name field is mandatory
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensures the email is unique
    //match: [/^\S+@\S+\.\S+$/, 'Invalid email address'], // Regex for validating email
  },
  mobileNo: {
    type: String,
    required: true,
    //match: [/^\d{10}$/, 'Invalid mobile number'], // Regex to validate 10-digit mobile numbers
  },
  designation: {
    type: String,
    required: true,
    //enum: ['HR', 'Manager', 'Sales']
  },
  gender: {
    type: String,
    //enum: ['Male', 'Female', 'Other'], // Ensures only valid options are saved
    required: true,
  },
  course: {
    type: [String],
  },
  imgUpload: {
    type: String,
    required: false, // Optional image upload
    default: null, // Set default if no image is uploaded
  },
  createdAt: { type: Date, default: Date.now },
});

// Create the Model
const t_employee = mongoose.model("t_employee", employee);

// Export the Model
module.exports = t_employee;
