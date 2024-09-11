const User = require('../models/userModel');
const Appointment = require('../models/appointmentModel');
const Payment = require('../models/paymentModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//Function to create a new user/staff

exports.createUser = async(req, res) => {
    const { name, email, role, password } = req.body;

    try{
        const hashedPassword = await bcrypt.hash(password, 8);

// create new user and save to db after hashing password
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

exports.updateUser = async(req, res) => {
    const { id } = req.params;
    const { name, email, role } = req.body;
    try{
        //finding user by their id and updating the info
        const updateUser = await User.findByIdAndDelete(id, { name, email, role }, { new: true} );
        if(!updateUser){
            return res.send(404).json({message: 'Cannot find this user'});
        }
        res.status(200).json({message: 'User updated successfully', user: updateUser});
    }catch (error) {
        res.status(500).json({message: 'Unable to update this user', error });
    }
};

exports.getAllUsers = async(req, res) => {
    try{
        const users = await User.find();
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({message: 'error.message'});
    }
};

exports.getUserById = async(req, res) => {
    const { id } = req.params;
    const { name, email, role } = req.body;
    try{
        const getUser = await User.findById(id, { name, email, role });
        res.status(200).json(getUser)
    } catch (error) {
        res.status(500).json({message: 'error.message'});
    }
};

