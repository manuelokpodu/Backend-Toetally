// Import the mongoose library to interact with MongoDB.
const mongoose = require("mongoose");

// Define a new schema for orders using mongoose.Schema.
// This schema outlines the structure of an order document in the database.
const orderSchema = new mongoose.Schema(
  {
    // 'user' field: References the User who placed the order.
    // It is required and stores the ObjectId from the "User" collection.
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    // 'items' field: An array where each element represents an item in the order.
    items: [
      {
        // 'product' field: References the Product being ordered.
        // It stores the ObjectId from the "Product" collection.
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        // 'quantity' field: Number of units of the product ordered.
        quantity: Number,
        // 'price' field: Price of the product at the time of order.
        price: Number,
      },
    ],

    total: { type: Number, required: true },

    paymentStatus: { type: String, default: "pending" },
  },

  { timestamps: true },
);

// Export the Order model based on the defined orderSchema.
// This model will interact with the 'orders' collection in the MongoDB database.
module.exports = mongoose.model("Order", orderSchema);
