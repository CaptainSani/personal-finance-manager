const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const { authenticate } = require('../midddleware/auth');



router.patch('/users/username', authenticate, userController.updateUsername);
router.patch('/users/email', authenticate, userController.updateEmail);
router.patch('/users/password', authenticate, userController.updatePassword);