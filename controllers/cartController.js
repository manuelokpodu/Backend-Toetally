// Import the Cart model to interact with the "carts" collection in MongoDB.
const Cart = require("../models/Cart");

// Import the Product model (though not directly used in these functions, it might be useful for reference).
const Product = require("../models/Product");

// ====================================
// Controller function to add a product to the user's cart.
const addToCart = async (req, res) => {
  try {
    // Destructure productId and quantity from the request body.
    const { productId, quantity } = req.body;

    // Retrieve the user's id from the authenticated request (set by auth middleware).
    const userId = req.user.id;

    // Find an existing cart for the user.
    let cart = await Cart.findOne({ user: userId });

    // If no cart exists for this user, create a new cart with an empty items array.
    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    // Check if the product is already present in the cart items.
    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (existingItem) {
      // If the item exists, increase its quantity by the provided quantity.
      existingItem.quantity += quantity;
    } else {
      // Otherwise, push a new item with the productId and quantity into the cart's items array.
      cart.items.push({ product: productId, quantity });
    }

    // Save the updated cart back to the database.
    await cart.save();
    // Respond with the updated cart data and a 200 status.
    res.status(200).json(cart);
  } catch (err) {
    // If an error occurs, respond with a 500 status and an error message.
    res.status(500).json({ message: "Error adding to cart" });
  }
};

// ==================================
// Controller function to retrieve the current user's cart.
const getCart = async (req, res) => {
  try {
    // Find the cart for the current user and populate the product details in each item.
    const cart = await Cart.findOne({ user: req.user.id }).populate(
      "items.product"
    );
    // Respond with the cart data and a 200 status.
    res.status(200).json(cart);
  } catch (err) {
    // If an error occurs, respond with a 500 status and an error message.
    res.status(500).json({ message: "Error fetching cart" });
  }
};

// ==================================
// Controller function to update the quantity of a specific product in the cart.
const updateQuantity = async (req, res) => {
  try {
    // Extract the productId from the request parameters.
    const { productId } = req.params;
    // Extract the new quantity from the request body.
    const { quantity } = req.body;
    // Get the current user's id.
    const userId = req.user.id;

    // Find the user's cart.
    const cart = await Cart.findOne({ user: userId });
    // If no cart is found, respond with a 404 Not Found.
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Find the specific item in the cart by matching product id.
    const item = cart.items.find(
      (item) => item.product.toString() === productId
    );

    // If the item is not found, respond with a 404 Not Found.
    if (!item) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    // Update the quantity of the item with the new quantity.
    item.quantity = quantity;
    // Save the updated cart back to the database.
    await cart.save();

    // Respond with the updated cart data and a 200 status.
    res.status(200).json(cart);
  } catch (err) {
    // If an error occurs, respond with a 500 status and an error message.
    res.status(500).json({ message: "Error updating quantity" });
  }
};

// ==================================
// Controller function to remove an item from the cart.
const removeFromCart = async (req, res) => {
  try {
    // Extract the productId from the request parameters.
    const { productId } = req.params;
    // Get the current user's id.
    const userId = req.user.id;

    // Find the user's cart.
    const cart = await Cart.findOne({ user: userId });
    // If no cart is found, respond with a 404 Not Found.
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Filter out the item that matches the given productId.
    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

    // Save the updated cart back to the database.
    await cart.save();
    // Respond with the updated cart data and a 200 status.
    res.status(200).json(cart);
  } catch (err) {
    // If an error occurs, respond with a 500 status and an error message.
    res.status(500).json({ message: "Error removing item" });
  }
};

// Export the cart controller functions for use in routing.
module.exports = { addToCart, getCart, updateQuantity, removeFromCart };
