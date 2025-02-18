// Import the Stripe library and initialize it with the secret key from environment variables.
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Define the createPaymentIntent controller function to handle payment intent creation.
const createPaymentIntent = async (req, res) => {
  try {
    // Extract the 'amount' from the request body.
    const { amount } = req.body;

    // Create a new PaymentIntent with Stripe.
    // Multiply the amount by 100 because Stripe works with the smallest currency unit (kobo for NGN).
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert amount to kobo
      currency: "ngn", // Set currency to Nigerian Naira
      automatic_payment_methods: { enabled: true }, // Enable automatic payment methods
    });

    // Respond with a 200 status and send back the client secret from the PaymentIntent.
    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    // In case of any error, respond with a 500 status and send the error message.
    res.status(500).json({ error: err.message });
  }
};

// Export the createPaymentIntent function so that it can be used as a controller in routes.
module.exports = createPaymentIntent;
