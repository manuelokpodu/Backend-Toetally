// Import the mongoose library to define schemas and interact with MongoDB.
const mongoose = require("mongoose");

// Define a schema for individual cart items.
const cartItemSchema = new mongoose.Schema({
  // 'product' field: References a Product document.
  // It stores the ObjectId from the "Product" collection and is required.
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },

  // 'quantity' field: Stores the quantity of the product in the cart.
  // It is required, has a default value of 1, and cannot be less than 1.
  quantity: {
    type: Number,
    required: true,
    default: 1,
    min: 1,
  },
});

// Define the main schema for a shopping cart.
const cartSchema = new mongoose.Schema(
  {
    // 'user' field: References the User who owns this cart.
    // It stores the ObjectId from the "User" collection, is required, and must be unique (one cart per user).
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    // 'items' field: An array of cart items based on the cartItemSchema.
    items: [cartItemSchema],
  },
  // Enable timestamps to automatically add 'createdAt' and 'updatedAt' fields.
  { timestamps: true }
);

// Export the Cart model based on the cartSchema.
// This model will interact with the 'carts' collection in the MongoDB database.
module.exports = mongoose.model("Cart", cartSchema);
