const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const createPaymentIntent = async (req, res) => {
  try {
    const { amount } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert amount to kobo
      currency: "ngn", // Set currency to Nigerian Naira
      automatic_payment_methods: { enabled: true }, // Enable automatic payment methods
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = createPaymentIntent;
