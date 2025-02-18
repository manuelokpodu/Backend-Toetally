// Import the jsonwebtoken library for creating and verifying JWT tokens.
const jwt = require("jsonwebtoken");
// Import bcryptjs library for hashing and comparing passwords.
const bcrypt = require("bcryptjs");

// Import the User model which interacts with the 'users' collection in MongoDB.
const User = require("../models/User");

// Define an asynchronous function 'signup' to handle user registration.
const signup = async (req, res, next) => {
  try {
    // Destructure email, password, and repeatPassword from the request body.
    const { email, password, repeatPassword } = req.body;

    // Validate that email and password are provided and that the password matches repeatPassword.
    // If validation fails, send a 401 Unauthorized response with an error message.
    if (!email || !password || password !== repeatPassword) {
      return res.status(401).json({ message: "Invalid input data" });
    }

    // Hash the user's password with a salt factor of 10.
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user document in the database using the User model.
    // The password stored in the database is the hashed version.
    const user = await User.create({ email, password: hashedPassword });

    // Respond with a 201 Created status and return the created user in JSON format.
    res.status(201).json(user);
  } catch (err) {
    // If an error occurs, pass it to the next middleware (error handler).
    next(err);
  }
};

// Define an asynchronous function 'login' to handle user authentication.
const login = async (req, res, next) => {
  try {
    // Destructure email and password from the request body.
    const { email, password } = req.body;

    // Validate that both email and password are provided.
    // If either is missing, send a 401 Unauthorized response with an error message.
    if (!email || !password) {
      return res.status(401).json({ message: "Invalid input data" });
    }

    // Find a user in the database matching the provided email.
    const user = await User.findOne({ email });

    // If no user is found or the provided password does not match the stored hashed password,
    // respond with a 401 Unauthorized status and an error message.
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate a JWT token that includes the user's id in the payload.
    // The token is signed with the secret key from environment variables and set to expire in 3 days.
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });

    // Respond with a 200 OK status and return both the token and user details in JSON format.
    res.status(200).json({ token, user });
  } catch (err) {
    // If an error occurs, pass it to the next middleware (error handler).
    next(err);
  }
};

// Export the signup and login functions so that they can be used in routing.
module.exports = { signup, login };
