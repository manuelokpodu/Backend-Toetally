// Import the Express library to create a router.
const express = require("express");
// Import the newsletter controller function to handle newsletter-related logic.
const newsletter = require("../controllers/newsletterController");

// Create a new router instance using Express.
const router = express.Router();

// Define a POST route at "/newsletter".
// When a POST request is made to this endpoint, the newsletter controller function is executed.
router.post("/newsletter", newsletter);

// Export the router so that it can be used in the main application.
module.exports = router;
