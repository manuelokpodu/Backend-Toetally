// Import the Express library to utilize its routing features.
const express = require("express");

// Create a new router instance using Express.
const router = express.Router();

// Import the productController which contains all the handler functions for product routes.
const productController = require("../controllers/productController");

// Import the authentication middleware to protect routes that require user authentication.
const authenticate = require("../middlewares/authMiddleware");

// Route to get all products.
// When a GET request is made to /api/products, the getAllProducts controller function is called.
router.get("/", productController.getAllProducts);

// Route to get a single product by its ID.
// When a GET request is made to /api/products/:id, the getProductById controller function is called.
router.get("/:id", productController.getProductById);

// Route to rate a product.
// This route is protected by the 'authenticate' middleware to ensure that only authenticated users can rate a product.
// When a POST request is made to /api/products/:id/rate, the rateProduct controller function is executed.
router.post("/:id/rate", authenticate, productController.rateProduct);

// Route to like a product.
// This is also protected by the 'authenticate' middleware.
// When a POST request is made to /api/products/:id/like, the likeProduct controller function is called.
router.post("/:id/like", authenticate, productController.likeProduct); // NEW route

// Route to unlike a product.
// This route is protected by the 'authenticate' middleware as well.
// When a POST request is made to /api/products/:id/unlike, the unlikeProduct controller function is executed.
router.post("/:id/unlike", authenticate, productController.unlikeProduct);

// Export the router so that it can be used in the main application.
module.exports = router;
