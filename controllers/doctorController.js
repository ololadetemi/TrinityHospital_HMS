const User = require('../models/userModel');
const Patient = require('../models/patientModel')
const Appointment = require('../models/appointmentModel');
const Result = require("../models/resultModel");
exports.getPatientRecords = async(req, res) => {
    try{
        const patientRecords = await Patient.find();
        res.status(200).json(patientRecords);
    } catch (error) {
        res.status(500).json({ meessage: 'error fetching patient records', error});
    }
}
//to add doctor's note to doctotrNote section in patient schema
exports.addDoctorNote = async(req, res) => {
    const { patientId } = req.params;
    const { note } = req.body;
    const doctorId = req.user._id;

    try{
        const patient = await Patient.findById(patientId);
        if(!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        patient.doctorsNotes.push({
            doctorId,
            note,
        });

        await patient.save();
        res.status(200).json({ message: 'Doctor\'s note added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error adding doctor\'s note' });
    }
}

//to edit doctor's note. Only the doctor that added the note can make this edit
exports.editDoctorNote = async(req, res) => {
    const { patientId, noteId } = req.params;
    const { note } = req.body;
    const doctorId = req.user._id;

    try{
        const patient = await Patient.findById(patientId);
        if(!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        
        //find the specific note the doctor wants to edit
        //if the part being edited is not a doctorsNote or the doctor id is not associated to the one that created the note earlier
        const doctorsNote = patient.doctorsNotes.id(noteId);
        if(!doctorsNote || doctorsNote.doctorId.toString() !== doctorId.toString()){
            return res.status(403).json({ message: 'Unauthorized to edit this note' });
        }
         //Now update the note if the earlier codeblock is by passed
        doctorsNote.note = note;
        doctorsNote.date = Date.now;

        await patient.save();
        res.send(200).json({ message: 'Doctor\'s note edited successfully' });
    } catch (error) {
        res.send(200).json({ message: 'Unable to edit doctor\'s note' });
    }
}

//I don't think i want to have a delete doctor's note because its a patient record and the doctor should not have the power to erase a note completely from existence

//allow doctor's view appointment
exports.viewAppointments = async(req, res) => {
    try{
        const appointments = await Appointment.find();
        res.status(200).json({ message: 'Appointments retrieved', appointments})
    } catch (error) {
        res.status(500).json({message: 'Error retrieving appointments', error});
    }
};

//allow doctor to view  specific patient result
exports.viewResults = async(req, res) => {
    
}