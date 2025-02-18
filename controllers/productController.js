// Import the Product model to interact with product documents in MongoDB.
const Product = require("../models/Product");

// Controller function to retrieve all products.
const getAllProducts = async (req, res, next) => {
  try {
    // Find all products in the database.
    const products = await Product.find();
    // Respond with a 200 status and the products in JSON format.
    res.status(200).json(products);
  } catch (err) {
    // If an error occurs, pass it to the next middleware (error handler).
    next(err);
  }
};

// Controller function to retrieve a single product by its ID.
const getProductById = async (req, res, next) => {
  try {
    // Find the product using the id from the request parameters.
    const product = await Product.findById(req.params.id);

    // If no product is found, respond with a 404 status and an error message.
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // If the product is found, respond with a 200 status and the product data.
    res.status(200).json(product);
  } catch (err) {
    // Pass any errors to the error handling middleware.
    next(err);
  }
};

// Controller function to rate a product.
const rateProduct = async (req, res, next) => {
  // Extract the product id from the request parameters.
  const { id } = req.params;
  // Extract the rating value from the request body.
  const { rating } = req.body;

  // Validate the rating: It must be provided and be between 1 and 5.
  if (!rating || rating < 1 || rating > 5) {
    return res.status(400).json({ message: "Rating must be between 1 and 5." });
  }

  try {
    // Find the product by its id.
    const product = await Product.findById(id);

    // If the product is not found, return a 404 error.
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    // Update the product's ratings:
    // Increment the count of ratings.
    product.ratings.count += 1;
    // Add the new rating to the cumulative sum.
    product.ratings.sum += rating;
    // Calculate the new average rating.
    product.ratings.average = product.ratings.sum / product.ratings.count;

    // Save the updated product back to the database.
    await product.save();

    // Respond with a success message and the updated ratings.
    res.status(200).json({
      message: "Rating submitted successfully.",
      updatedRatings: product.ratings,
    });
  } catch (err) {
    // Pass any errors to the error handling middleware.
    next(err);
  }
};

// Controller function to like a product.
const likeProduct = async (req, res, next) => {
  try {
    // Extract the product id from the request parameters.
    const { id } = req.params;
    // Extract the user id from the authenticated request (set by the auth middleware).
    const userId = req.user.id; // Updated from req.user._id

    // Find the product by its id.
    const product = await Product.findById(id);
    // If the product does not exist, respond with a 404 error.
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    // Convert the likedBy array entries to strings for accurate comparison.
    const likedByIds = product.likedBy.map((uid) => uid.toString());
    // If the current user has not already liked the product...
    if (!likedByIds.includes(userId.toString())) {
      // Add the user's id to the likedBy array.
      product.likedBy.push(userId);
      // Update the likes count based on the length of the likedBy array.
      product.likes = product.likedBy.length;
      // Save the updated product.
      await product.save();
    }
    // Respond with a success message along with the updated likes data.
    res.status(200).json({
      message: "Product liked",
      likes: product.likes,
      likedBy: product.likedBy,
    });
  } catch (err) {
    // Pass errors to the error handling middleware.
    next(err);
  }
};

// Controller function to unlike a product.
const unlikeProduct = async (req, res, next) => {
  try {
    // Extract the product id from the request parameters.
    const { id } = req.params;
    // Extract the user id from the authenticated request.
    const userId = req.user.id; // Updated from req.user._id

    // Find the product by its id.
    const product = await Product.findById(id);
    // If the product is not found, return a 404 error.
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    // Remove the user from the likedBy array by filtering out the current user's id.
    product.likedBy = product.likedBy.filter(
      (uid) => uid.toString() !== userId.toString()
    );
    // Update the likes count to reflect the new number of likes.
    product.likes = product.likedBy.length;
    // Save the changes to the database.
    await product.save();

    // Respond with a success message along with the updated likes data.
    res.status(200).json({
      message: "Product unliked",
      likes: product.likes,
      likedBy: product.likedBy,
    });
  } catch (err) {
    // Pass any errors to the error handling middleware.
    next(err);
  }
};

// Export the controller functions so they can be used in routes.
module.exports = {
  getAllProducts,
  getProductById,
  rateProduct,
  likeProduct,
  unlikeProduct,
};
