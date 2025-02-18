// Load environment variables from a .env file into process.env.
require("dotenv").config();

// Import the Express library.
const express = require("express");
// Import the Express application instance from the app module.
const app = require("./app");
// Import the function that connects to the database.
const connectDB = require("./db/connection");

// Set the port to the value defined in the environment variables, or default to 5000.
const PORT = process.env.PORT || 5000;

// Define an asynchronous function to start the server.
const startServer = async () => {
  try {
    // Attempt to connect to the database.
    await connectDB();
    console.log("Connected to the database successfully.");

    // Start listening on the specified port once the database connection is successful.
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (err) {
    // If an error occurs (e.g., database connection fails), log the error message.
    console.error("Failed to connect to the database:", err.message);
    // Exit the process with a failure code.
    process.exit(1);
  }
};

// Invoke the function to start the server.
startServer();
