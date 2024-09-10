const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema ({

    patientName: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Patient',
        required: true
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        required: true
    },
    appointmentDate: {
        type: Date,
        required: true
    },
    bookedBy: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Appointment = mongoose.model('appointment', appointmentSchema);

module.exports = Appointment;