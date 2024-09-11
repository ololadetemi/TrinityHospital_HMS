const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//To create a new user/staff

exports.createUser = async(req, res) => {
    const { name, email, role, password } = req.body;

    try{
        const hashedPassword = await bcrypt.hash(password, 8);

// create new user
const newUser = new User({
    name,
    email,
    role,
    password: hashedPassword,
});
await newUser.save();
res.status(201).json({messahe: 'User created successfully', user:newUser});

    } catch (error) {
        res.status(500).json({message: error.message});
    }
};