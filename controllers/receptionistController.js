//this controller handles receptionist access. Receptionist is allowed to create a patient data from the patient schema, update and edit payments and view/create patient appointments

const User = require('../models/userModel');
const Appointment = require('../models/appointmentModel');
const Patient = require('../models/patientModel');
//To create patient data 
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

//To create patient appointment
exports.createAppointment = async(req, res) => {
    const { patientId, date, doctor, reason } = req.body;
    try{
        const newAppointment = new Appointment({
            patient: patientId,
            date,
            doctor,
            reason
        });
        await newAppointment.save();
        res.status(200).json({message: 'Appointment booked successfully', appointment: newAppointment});
    } catch(error) {
        res.status(500).json({ message: 'Error booking the appointment', error });
    }
};

//to edit patient appointment
exports.editAppointment = async(req, res) => {
    const { appointmentId, date, doctor, reason } = req.body;
    try{
        const updatedAppointment = await Appointment.findByIdAndUpdate(appointmentId,
            {
                date, doctor, reason}, { new: true}
    );
    if (!updatedAppointment) {
        return res.status(404).json({ message: 'Appointment not found' })
    }
    res.status(200).json({ message: 'Appointment edited successfully', appointment: updatedAppointment});
    } catch (error) {
        res.status(500).json({ message: 'Error editing the appointment', error});
    }
};

//to delete an appointment
exports.removeAppointment = async(req, res) => {
    const { appointmentId } = req.body;
    try{
        const deletedAppointment = await Appointment.findByIdAndDelete(appointmentId);
    if (!deletedAppointment) {
        return res.status(404).json({ message: 'Appointment not found'});
    }
        res.status(200).json({ message: 'Appointment successfully deleted'});
    } catch (error) {
        res.status(500).json({ message: 'Error deleting this appointment', error });
    }
};

//create or input payment
exports.createPayment = (req, res) => {
    const { patientId, paymentMethod, amount, date } = req.body;
    try {
        const newPayment = Payment
    }
}

