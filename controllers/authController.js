//this controller is for handling authentication purposes. Handling login and later, log out purposes
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { escape } = require('validator');
require('dotenv').config();

//User login
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
//Check the email address
        const user = await User.findOne({ email });
        if(!user) return res.status(401).json({ message: 'Invalid email or password' });
//Check the password
        const isMatch = await user.comparePassword(password);
        if(!isMatch) return res.status(401).json({ message: 'Incorrect password' });
//Create the jwt token
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: 3 * 24 * 60 * 60,
        });
        res.satus(200).json({ message: 'Login successful', token });
    } catch (error) {
        escape.status(500).json({ message: 'Server error', error });
    };
};

//To allow admin create new staff only
exports.register