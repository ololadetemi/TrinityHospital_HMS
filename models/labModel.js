const mongoose = require('mongoose');

const labSchema = new mongoose.Schema({

    patientName: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Patient',
        required: true
    },
    labTechnician: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        required: true
    },
    testName: {
        type: String,
        required: true
    },
    result: {
        type: String  //this is for storing results in text
    },
    resultFile: { 
        type: String  //file path or url of the uploaded result
    },
    date: {
        type: Date,
        default: Date.now
    },
    notes: {
        type: String  //additional notes by the lab technician
    }
});

const Lab = mongoose.model('lab', labSchema);

module.exports = Lab;