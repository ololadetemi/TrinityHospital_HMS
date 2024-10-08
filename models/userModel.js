const mongoose = require('mongoose');
const { isEmail } = require('validator')
const bcrypt = require('bcryptjs')
const userSchema = new mongoose.Schema (
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: [true, 'please enter an email'],
            lowercase: true,
            unique: true,
            validate: [isEmail, 'please enter a valid email']
        },
        password: {
            type: String,
            required: [true, 'please enter a password'],
            minLength: [6, 'minimum length is 6 characters']
        },
        role: {
            type: String,
            enum: ['admin', 'doctor', 'lab_technician', 'receptionist'],
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }
);

//Hashing password before saving to DB
userSchema.pre('save',async function (next) {
    if (!this.isModified ('password')) return next();
//Salting and hashing before saving
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        console.log(`Hashed password: ${this.password}`);
        console.log('User about to be created', this)
        next();
    } catch (error) {
        next(error);
    }
});
//to compare inputed password to hashed password
userSchema.methods.comparePassword = async function (candidatePassword) {
    console.log(`Candidate Password: ${candidatePassword}`);
    console.log(`Stored Hashed Password: ${this.password}`);
    const match = await bcrypt.compare(candidatePassword, this.password);
    
    return await bcrypt.compare(candidatePassword, this.password);

};

const User = mongoose.model('User', userSchema);

module.exports = User;