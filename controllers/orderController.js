// Import the Order model to interact with the orders collection in MongoDB.
const Order = require("../models/Order");

// Define an asynchronous function to create a new order.
const createOrder = async (req, res) => {
  try {
    // Use the Order model's create method to add a new order document to the database.
    // The order object includes:
    // - user: The id of the authenticated user (attached to req.user by the auth middleware).
    // - items: The list of order items from the request body.
    // - total: The total amount for the order from the request body.
    const order = await Order.create({
      user: req.user.id,
      items: req.body.items,
      total: req.body.total,
    });

    // Respond with a 201 status code (Created) and send the created order in JSON format.
    res.status(201).json(order);
  } catch (err) {
    // If an error occurs during order creation, respond with a 500 status code (Internal Server Error)
    // and a JSON object with an error message.
    res.status(500).json({ error: "Order creation failed" });
  }
};

// Export the createOrder function so it can be used in routing.
module.exports = createOrder;
