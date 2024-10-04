//This file is to create the first ever admin  in order to create other roles
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/userModel');

require('dotenv').config();

//Database connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch((err) => console.log('Database connection error:', err));

//Create the first Admin
const seedAdmin = async () => {
    try {
        const existingAdmin = await User.findOne({ role: 'admin' });
        if (existingAdmin) {
            console.log('Admin already exists');
            process.exit();
        }
        const hashedPassword = await bcrypt.hash('admin2024')
    } catch (err) {
        console.error('Error creating SeedAdmin:', err);
        process.exit(1);
    }
};