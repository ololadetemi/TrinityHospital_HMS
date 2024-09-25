//this controller is for handling authentication purposes. Handling login and later, log out purposes
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

//User login