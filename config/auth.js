// config/auth.js
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const secretKey = "SycamorePFM";

const authenticate = async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
};

module.exports = { authenticate, secretKey };
