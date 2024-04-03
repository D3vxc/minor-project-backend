const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  // Extract the token from the Authorization header
  let token = req.headers["authorization"];

  // Check if the token is present
  if (!token) {
    return res
      .status(403)
      .send({ message: "A token is required for authentication" });
  }

  // If the token is prefixed with 'Bearer ', remove it to get the actual token value
  if (token.startsWith("Bearer ")) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }

  // Verify the token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Add the decoded user to the request object for use in your routes
  } catch (err) {
    return res.status(401).send({ message: "Invalid Token" });
  }

  return next(); // Proceed to the next middleware or route handler
};

module.exports = { authenticate };
