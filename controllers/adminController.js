const User = require('../models/userModel');
const Appointment = require('../models/appointmentModel');
const Payment = require('../models/paymentModel');
const bcrypt = require('bcryptjs');
//const jwt = require('jsonwebtoken');
const Patient = require('../models/patientModel');

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
res.status(200).json({message: 'User created successfully', user:newUser});

    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

//finding user by their id and updating the info
exports.updateUser = async(req, res) => {
    const { id } = req.params;
    const { name, email, role } = req.body;
    try{
        
        const updateUser = await User.findByIdAndUpdate(id, { name, email, role }, { new: true} );
        if(!updateUser){
            return res.status(404).json({message: 'Cannot find this user'});
        }
        res.status(200).json({message: 'User updated successfully', user: updateUser});
    }catch (error) {
        res.status(500).json({message: 'Unable to update this user', error });
    }
};

//getting all users
exports.getAllUsers = async(req, res) => {
    try{
        const users = await User.find();
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({message: error.message });
    }
};

//get specific user by their id

exports.getUserById = async(req, res) => {
    const { id } = req.params;
    const { name, email, role } = req.body;
    try{
        const getUser = await User.findById(id, { name, email, role });
        res.status(200).json(getUser)
    } catch (error) {
        res.status(500).json({message: error.message });
    }
};

//deleting a specific user using their id

exports.deleteUser = async(req, res) => {
    const { id } = req.params;
    try{
        const deleteUser = await User.findByIdAndDelete(id);
        if(!deleteUser) {
            return res.status(404).json({message: 'This user does not exist'});
        }
        res.status(200).json({message: 'User deleted successfully'})
    }catch (error) {
        res.status(500).json({message: 'Error deleting user', error});
    }
};

//view payments by patients by card number

exports.viewPayment = async(req, res) => {
    const { cardNumber } = req.query;
    try{
        const patient = await Patient.findOne({ cardNumber });
        if(!patient) {
            return res.status(404).json({message: 'Patient not found'});
        }
        const payment = await Payment.find({ patientId: patient._id });
        res.status(200).json(payment)
    } catch (error) {
        res.status(500).json({message: 'Error retrieving payments', error});
    }
};

//viewing appointments
exports.viewAppointments = async(req, res) => {
    try{
        const appointments = await Appointment.find();
        res.status(200).json({ message: 'Appointments retrived', appointments})
    } catch (error) {
        res.status(500).json({message: 'Error retrieving appointments', error});
    }
};
