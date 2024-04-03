const jwt = require("jsonwebtoken");
const userModel = require("../user/user.model");

const Adminauthenticate = async (req, res, next) => {
  // Extract the token from the Authorization header
  const token = req.headers.authorization?.split(" ")[1];
  // Check if the token is present
  if (!token) {
    return res
      .status(403)
      .send({ message: "A token is required for authentication" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await userModel.findById(decoded.userId);
    if (!user.isAdmin) {
      return res.status(403).send({ message: "Unauthorized" });
    }
    req.user = user;
  } catch (err) {
    return res.status(401).send({ message: "Invalid Token" });
  }
  return next(); // Proceed to the next middleware or route handler
};

module.exports = { Adminauthenticate };
