const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema ({

    patientName: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
        required: true
    },
    contact: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    registeredBy: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    doctorsNotes: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

});

const Patient = mongoose.model('patient', patientSchema);

module.exports = Patient;