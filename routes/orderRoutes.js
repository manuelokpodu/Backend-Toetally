// Import the Express library to create a new router.
const express = require("express");
// Import the controller function that handles order creation.
const createOrder = require("../controllers/orderController");
// Import the authentication middleware to ensure only logged-in users can create orders.
const authenticate = require("../middlewares/authMiddleware");

// Create a new router instance from Express.
const router = express.Router();

// Define a POST route at the root ("/") of this router.
// The authenticate middleware is applied first to check user authentication.
// If the user is authenticated, the createOrder controller is executed to create a new order.
router.post("/", authenticate, createOrder);

// Export the router so it can be used in the main application.
module.exports = router;
