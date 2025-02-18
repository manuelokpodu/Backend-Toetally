// Import the mongoose library to interact with MongoDB.
const mongoose = require("mongoose");

// Define a new schema for the User model using mongoose.Schema.
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please add your firstname"],
    maxlength: [50, "Name must not be more than 50 characters"],
  },
  lastName: {
    type: String,
    required: [true, "Please add your lastname"],
    maxlength: [50, "Name must not be more than 50 characters"],
  },
  // Email field: must be a string, is required, and must be unique in the database.
  email: {
    type: String,
    required: [true, "please provide an email"],
    unique: [true, "User already exist"],
    match: [
      /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/,
      "Please add a valid email",
    ],
  },
  // Password field: must be a string and is required.
  password: {
    type: String,
    required: [true, "please add a password"],
    minlenght: [8, " Password must be more than 8 characters"],
  },
});

// Create and export the User model.
// This model represents the 'users' collection in the MongoDB database.
module.exports = mongoose.model("User", userSchema);
