// Import the Newsletter model to interact with the newsletter subscriptions in the database.
const Newsletter = require("../models/newsletter");

// Define an asynchronous function to handle newsletter subscriptions.
const newsletter = async (req, res) => {
  // Destructure the email from the request body.
  const { email } = req.body;

  // Validate that an email was provided.
  // If not, return a 400 Bad Request response with an error message.
  if (!email) {
    return res.status(400).json({ message: "Email is required." });
  }

  try {
    // Check if the email is already subscribed by searching for it in the Newsletter collection.
    const existingSubscription = await Newsletter.findOne({ email });

    // If the email is found, it means the user is already subscribed.
    // Return a 400 Bad Request response with an appropriate message.
    if (existingSubscription) {
      return res.status(400).json({ message: "Email is already subscribed." });
    }

    // If the email is not already subscribed, create a new subscription document.
    const newSubscription = new Newsletter({ email });

    // Save the new subscription document to the database.
    await newSubscription.save();

    // Respond with a 200 OK status and a success message.
    res.status(200).json({ message: "Subscription successful!" });
  } catch (err) {
    // If an error occurs during the process, log the error to the console.
    console.error("Error saving subscription:", err);

    // Respond with a 500 Internal Server Error and a message indicating failure to subscribe.
    res.status(500).json({ message: "Failed to subscribe." });
  }
};

// Export the newsletter function so it can be used in routing.
module.exports = newsletter;
