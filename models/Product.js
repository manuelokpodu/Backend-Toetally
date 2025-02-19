const mongoose = require("mongoose");
const { Schema } = mongoose;

// Create an enum for the product tags (e.g., ADIDAS, NIKE)
const productTagEnum = [
  "ADIDAS",
  "NIKE",
  "PUMA",
  "LOUIS VUITTON",
  "BALENCIAGA",
  "UNDER ARMOUR",
  "Christian Louboutin",
  "Skechers",
  "New Balance",
]; // You can add more brands as needed

// Define the Shoe Schema
const ProductSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    productTag: {
      type: String,
      enum: productTagEnum,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    color: {
      type: String,
      required: true,
    },

    size: {
      type: [Number], // Array of sizes
      required: true,
    },

    image: {
      type: [String], // Array of image URLs
      required: true,
    },

    thumbnail: {
      type: String, // Single image URL for the thumbnail
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    productDetails: {
      type: [String], // Array of additional product features
      required: true,
    },
  },
  { timestamps: true },
); // You can add a timestamp to track creation and updates

// Create and export the Shoe model
module.exports = mongoose.model("Product", ProductSchema);
