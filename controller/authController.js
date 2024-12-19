const jwt = require('jsonwebtoken');
const User = require('../models/users');
const  env = require('dotenv').config(); 

const authController = {
    async register(req, res) {
      try {
        const { username, email, password } = req.body;
  
        if (!username || !email || !password) {
          return res.status(400).json({ error: 'Please provide all required fields' });
        }
  
        const user = await User.createUser(username, email, password);
        const createdUser = user;
<<<<<<< HEAD
        // const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        //   expiresIn: '1h'
        // });
        res.status(200).json({ user: createdUser, text: 'User created succesfully' });
=======
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_SECRET_EXPIRY,
        });
        res.status(200).json({message: `User ${username} Registered succesfully` });
>>>>>>> 991a07f (REFACTOR: Update success message format in user registration response)
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Registration failed, Login ?' });
      }
    },

    async login(req, res) {
        try {
          const { email, password } = req.body;
    
          if (!email || !password) {
            return res.status(400).json({ error: 'Please provide all required fields' });
          }
    
          const user = await User.loginUser(email, password);
          const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
          });
          res.json({ token, });
        } catch (error) {
          console.error(error);
          res.status(401).json({ error: 'Invalid email or password' });
        }
      },

};

module.exports = authController;