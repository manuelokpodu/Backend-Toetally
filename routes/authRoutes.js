// Import the Express library to create a router.
const express = require("express");

// Create a new router instance using Express.
const router = express.Router();

// Import the authentication controller which contains signup and login logic.
const authController = require("../controllers/authController");

// Define a POST route for user signup.
// When a POST request is sent to "/api/auth/signup", the signup function in authController is executed.
router.post("/signup", authController.signup);

// Define a POST route for user login.
// When a POST request is sent to "/api/auth/login", the login function in authController is executed.
router.post("/login", authController.login);

router.get("/getUser/:id", authController.getUser);

// Export the router so it can be used by the main application.
module.exports = router;
