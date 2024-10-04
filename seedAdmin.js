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
//check if the seed admin already exists
        const existingAdmin = await User.findOne({ role: 'admin' });
        if (existingAdmin) {
            console.log('Admin already exists');
            process.exit();
        }

//If seed admin doesn't exist it moves to this code and hashes password
        const hashedPassword = await bcrypt.hash('admin2024', 10);
//Creating a new admin; the seed admin
        const adminUser = new User({
            name: 'Admin',
            email: 'admin2024@gmail.com',
            password: hashedPassword,
            role: 'admin',
        });
        await adminUser.save();
        console.log('SeedAdmin created successfully');
        process.exit();
    } catch (err) {
        console.error('Error creating SeedAdmin:', err);
        process.exit(1);
    }
};

seedAdmin();