const jwt = require("jsonwebtoken");

const authenticate = async (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer "))
    return res.status(401).json({
      status: "Unathorized",
      statusCode: 401,
      error: "Access Denied: No Token Inserted.",
    });

  const token = authHeader.replace("Bearer ", "");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.userId };
    next();
  } catch (ex) {
    console.error("Authentication Error:", ex.message);
    res.status(401).json({
      status: "Unathorized",
      statusCode: 401,
      error: "Authentication Error: Expired Token, Please Login Again.",
    });
  }
};

module.exports = { authenticate };
