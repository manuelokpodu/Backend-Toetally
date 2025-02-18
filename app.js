// Import the Express framework for creating the server and handling routes.
const express = require("express");

// Import the CORS middleware to enable Cross-Origin Resource Sharing.
const cors = require("cors");

// Import Morgan middleware to log HTTP requests for development/debugging.
const morgan = require("morgan");

// Import route modules for different endpoints.
const orderRoutes = require("./routes/orderRoutes"); // Routes for order-related operations.
const paymentRoutes = require("./routes/paymentRoutes"); // Routes for handling payment transactions.
const productRoutes = require("./routes/productRoutes"); // Routes for product-related operations.
const authRoutes = require("./routes/authRoutes"); // Routes for user authentication (login, signup).
const newsletterRoutes = require("./routes/newsletterRoutes"); // Routes for newsletter subscription.
const cartRoutes = require("./routes/cartRoutes"); // Routes for shopping cart operations.

// Create an instance of an Express application.
const app = express();

// Use CORS middleware to allow cross-origin requests.
app.use(cors());

// Use express.json() middleware to parse JSON payloads in incoming requests.
app.use(express.json());

// Use Morgan middleware in 'dev' mode to log HTTP requests to the console.
app.use(morgan("dev"));

// Mount the product routes at the "/api/products" endpoint.
app.use("/api/products", productRoutes);

// Mount the authentication routes at the "/api/auth" endpoint.
app.use("/api/auth", authRoutes);

// Mount the newsletter subscription routes at the "/api/sub" endpoint.
app.use("/api/sub", newsletterRoutes);

// Mount the shopping cart routes at the "/api/cart" endpoint.
app.use("/api/cart", cartRoutes);

// Mount the payment routes at the "/api/payment" endpoint.
app.use("/api/payment", paymentRoutes);

// Mount the order routes at the "/api/orders" endpoint.
app.use("/api/orders", orderRoutes);

// Global error handling middleware.
// This middleware catches any errors passed down the middleware chain.
app.use((err, req, res, next) => {
  // Log the error stack to the console for debugging.
  console.error(err.stack);
  // Send an error response with the error status (or 500 if not specified)
  // and a JSON object containing the error message.
  res
    .status(err.status || 500)
    .json({ message: err.message || "Internal Server Error" });
});

// Export the Express app instance so it can be used in other modules (e.g., server.js).
module.exports = app;


// manuelokpodu
// vku2APPgDy5sEwMI
// mongodb+srv://manuelokpodu:vku2APPgDy5sEwMI@cluster0.dkbks.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
