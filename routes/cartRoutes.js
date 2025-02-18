// Import the Express library to create a router.
const express = require("express");

// Destructure the cart controller functions that handle cart-related operations.
const {
  getCart,
  addToCart,
  updateQuantity,
  removeFromCart,
} = require("../controllers/cartController");

// Import the authentication middleware to protect cart routes.
const authenticate = require("../middlewares/authMiddleware"); // Ensure this path is correct

// Create a new router instance.
const router = express.Router();

// Define a GET route for retrieving the user's cart.
// The 'authenticate' middleware ensures that only authenticated users can access this route.
router.get("/", authenticate, getCart);

// Define a POST route for adding an item to the cart.
// The 'authenticate' middleware protects this route.
router.post("/add", authenticate, addToCart);

// Define a PUT route for updating the quantity of a specific product in the cart.
// The ':productId' parameter identifies which product to update.
// The 'authenticate' middleware protects this route.
router.put("/:productId", authenticate, updateQuantity);

// Define a DELETE route for removing a specific product from the cart.
// The ':productId' parameter specifies the product to remove.
// The 'authenticate' middleware ensures only authenticated users can remove items.
router.delete("/:productId", authenticate, removeFromCart);

// Export the router so it can be used in the main application.
module.exports = router;
