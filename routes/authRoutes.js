const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');
const userController = require('../controller/userController');
const { authenticate } = require('../middleware/auth');


router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/user/:email', authenticate, userController.getUserByEmail);
router.get('/user/id/:id', authenticate, userController.getUserById);
router.put('/user/update/:id', authenticate, userController.updateUserDetails);

module.exports = router;