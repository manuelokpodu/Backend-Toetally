// Import the mongoose library to interact with MongoDB.
const mongoose = require("mongoose");

// Define a new schema for the User model using mongoose.Schema.
const userSchema = new mongoose.Schema(
  {
    // Email field: must be a string, is required, and must be unique in the database.
    email: { type: String, required: true, unique: true },
    // Password field: must be a string and is required.
    password: { type: String, required: true },
  },
  // Enable timestamps to automatically add 'createdAt' and 'updatedAt' fields.
  { timestamps: true }
);

// Create and export the User model.
// This model represents the 'users' collection in the MongoDB database.
module.exports = mongoose.model("User", userSchema);
