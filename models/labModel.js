const mongoose = require('mongoose');

const labSchema = new mongoose.Schema({

    patientName: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Patient',
        required: true
    }
})