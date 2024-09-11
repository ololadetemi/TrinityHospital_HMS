const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({

    patientName: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Patient',
        required: true
    },
    technician: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        required: true
    },
    testType: {
        type: String,
        required: true,
        enum: ['Lab', 'Radiology', 'Diagnostic', 'Other']
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
    notes: {
        type: String  //additional notes by the lab technician
    },
    date: {
        type: Date,
        default: Date.now
    }
    
});

const Result = mongoose.model('result', resultSchema);

module.exports = Result;