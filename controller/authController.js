const jwt = require('jsonwebtoken');
const User = require('../models/users');
<<<<<<< HEAD
const env = require('dotenv').config();
=======
>>>>>>> 78d47fff298ac9fca0298ce33f42b60b7bc1c4e2

const authController = {
    async register(req, res) {
      try {
        const { username, email, password } = req.body;
  
        if (!username || !email || !password) {
          return res.status(400).json({ 
            status: "Bad Request",
            statusCode: "400",
            error: 'Please provide all required fields' });
        }
  
        const user = await User.createUser(username, email, password);

        res.status(200).json({
          status: "success",
          statusCode: "200",
<<<<<<< HEAD
          message: `User ${username} Registered Succesfully` } );
=======
          message: `User ${username} Registered Succesfully` });
>>>>>>> 78d47fff298ac9fca0298ce33f42b60b7bc1c4e2

      } catch (error) {
        console.error(error);
        res.status(500).json({ 
          status: "error",
          statusCode: "500",
          error: 'Registration failed, Login ?' });
      }
    },

    async login(req, res) {
        try {
          const { email, password } = req.body;
    
          if (!email || !password) {
            return res.status(400).json({ 
              status: "Bad Request",
              statusCode: "400",
              error: 'Please provide all required fields' });
          }
    
          const user = await User.loginUser(email, password);
          const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_SECRET_EXPIRY,
          });

          res.json({ 
            status: "Success",
            statusCode: "200",
            message: `${email} Logged-In Successfully` , token });

        } catch (error) {
          console.error(error);
          res.status(401).json({
            status: "Internal server error",
            statusCode: "401",
            error: 'Invalid email or password' });
        }
      },

};

module.exports = authController;