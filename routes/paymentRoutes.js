// Import the Express library to utilize its routing capabilities.
const express = require("express");
// Import the payment controller function that creates a PaymentIntent.
const createPaymentIntent = require("../controllers/paymentController");
// Import the authentication middleware to protect sensitive routes.
const authenticate = require("../middlewares/authMiddleware");

// Create a new router instance using Express.
const router = express.Router();

// Define a POST route for creating a payment intent.
// The route "/create-intent" is protected by the 'authenticate' middleware,
// meaning that only authenticated users can access it.
// Once authenticated, the createPaymentIntent controller function is invoked.
router.post("/create-intent", authenticate, createPaymentIntent);

// Export the router so that it can be mounted in the main app.
module.exports = router;
