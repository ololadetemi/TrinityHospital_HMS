//this route handles registration and login of users
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

//For login route
router.post('/login', authController.login);

router.post('/register', authController.register);

module.exports = router;