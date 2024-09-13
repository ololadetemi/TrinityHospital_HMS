//this controller handles receptionist access. Receptionist is allowed to create a patient data from the patient schema, update and edit payments and view/create patient appointments

const User = require('../models/userModel');
const Appointment = require('../models/appointmentModel');
const Patient = require('../models/patientModel');

exports.createPatient = async(req, res) => {
    const { name, cardNumber, age, gender, contact, address } = req.body;

    try{
        const newPatient = new Patient({
            name, cardNumber, age, gender, contact, address
        });

        await newPatient.save();
        res.status(200).json({ message: 'Patient successfully registered', patient: newPatient });
    } catch (error) {
        res.status(500).json({ message: 'Error registering patient', error })
    }

}