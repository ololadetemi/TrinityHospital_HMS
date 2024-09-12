const Patient = require('../models/patientModel')
const Appointment = require('../models/appointmentModel');

exports.getPatientRecordsb= async(req, res) => {
    try{
        const patientRecords = await Patient.find();
        res.status(200).json(patientRecords);
    } catch (error) {
        res.status(500).json({ meessage: 'error fetching patient records', error});
    }
}