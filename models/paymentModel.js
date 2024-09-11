const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema ({

    patientName: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Patient',
        required: true
    },
    receptionist: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    amountPaid: {
        type: Number,
        required: true
    },
    outstandingAmount: {
        type: Number,
        required: false
    },
    date: {
        type: Date,
        default: Date.now
    },
    method: {
        type: String, enum: ['cash', 'card'],
        required: true
    }
});

const Payment = mongoose.model('payment', paymentSchema);

module.exports = Payment;