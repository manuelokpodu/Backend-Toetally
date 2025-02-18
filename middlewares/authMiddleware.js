// Import the jsonwebtoken package to handle token verification.
const jwt = require("jsonwebtoken");

// Define the 'authenticate' middleware function to protect routes.
const authenticate = (req, res, next) => {
  // Retrieve the Authorization header from the incoming request.
  const authHeader = req.headers.authorization;

  // Check if the Authorization header is missing or doesn't start with "Bearer ".
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    // If the header is invalid, respond with a 401 Unauthorized status and an error message.
    return res
      .status(401)
      .json({ message: "No token provided, authorization denied." });
  }

  // Extract the token from the header.
  // The header is in the format "Bearer <token>", so we split it and take the second element.
  const token = authHeader.split(" ")[1];

  try {
    // Verify the token using the secret key from environment variables.
    // If the token is valid, jwt.verify returns the decoded token data.
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded token data (typically containing user information like the user id) to req.user.
    req.user = decoded;

    // Call next() to pass control to the next middleware or route handler.
    next();
  } catch (err) {
    // If token verification fails, respond with a 401 Unauthorized status and an error message.
    return res.status(401).json({ message: "Token is not valid." });
  }
};

// Export the authenticate middleware so it can be used in other parts of the application.
module.exports = authenticate;
