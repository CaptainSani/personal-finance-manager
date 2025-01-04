const jwt = require("jsonwebtoken");

// Middleware to authenticate JWT token for protected routes
const authenticate = async (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer "))
    return res.status(401).json({
  status:"Unathorized",
  statusCode: 401,
  error:"Access Denied: No Token Inserted."});

  const token = authHeader.replace("Bearer ", "");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.userId };
    next();
  } catch (ex) {
    console.error("Authentication Error:", ex.message);
    res.status(401).json({
      status:"Unathorized",
      statusCode: 401,
      error:"Authentication Denied: Invalid Token Inserted."});
  }
};

module.exports = { authenticate };