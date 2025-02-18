// Import mongoose library to interact with MongoDB.
const mongoose = require("mongoose");

// Define a schema for the Newsletter collection.
const newsletterSchema = new mongoose.Schema(
  {
    // 'email' field: stores the email address of the subscriber.
    // It is required and must be unique to prevent duplicate subscriptions.
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  // Enable timestamps to automatically add 'createdAt' and 'updatedAt' fields.
  { timestamps: true }
);

// Export the Newsletter model based on the newsletterSchema.
// This model will be used to interact with the 'newsletters' collection in the MongoDB database.
module.exports = mongoose.model("Newsletter", newsletterSchema);
