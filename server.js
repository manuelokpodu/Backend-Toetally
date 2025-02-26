require("dotenv").config();

const express = require("express");

const app = require("./app");

const connectDB = require("./db/connection");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    console.log("Connected to the database successfully.");

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to connect to the database:", err.message);

    process.exit(1);
  }
};

startServer();
