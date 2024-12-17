const jwt = require("jsonwebtoken");


// Middleware to authenticate JWT token for protected routes

const authenticate = async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const decoded = jwt.verify(token);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
};

module.exports = { authenticate };
