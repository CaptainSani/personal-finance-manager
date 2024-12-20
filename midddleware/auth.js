const jwt = require("jsonwebtoken");

// Middleware to authenticate JWT token for protected routes
const authenticate = async (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer "))
    return res.status(401).send("Access denied. No token provided.");

  const token = authHeader.replace("Bearer ", "");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(401).send("Invalid token.");
  }
};

module.exports = { authenticate };