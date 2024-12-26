const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');
const userController = require('../controller/userController');
const { authenticate } = require('../midddleware/auth');


router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/user/:email', authenticate, userController.getUserByEmail);
router.get('/user/id/:id', authenticate, userController.getUserById);
router.patch('/users/username/:id', authenticate, userController.updateUsername);
router.patch('/users/email/:id', authenticate, userController.updateEmail);
router.patch('/users/password/:id', authenticate, userController.updatePassword);

module.exports = router;