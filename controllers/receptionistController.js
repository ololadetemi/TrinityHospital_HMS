//this controller handles receptionist access. Receptionist is allowed to create a patient data from the patient schema, update and edit payments and view/create patient appointments

const User = require('../models/userModel');
const Appointment = require('../models/appointmentModel');
const Patient = require('../models/patientModel');
const Payment = require('../models/paymentModel');
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
exports.createPayment = async(req, res) => {
    const { patientName, receptionist, cardNumber, amount, amountPaid, method } = req.body;
    try {
        const outstandingAmount = amount - amountPaid;  //calculating the outstanding payment
        const newPayment = new Payment({
            patientName, receptionist, cardNumber, amount, amountPaid, outstandingAmount, method
        });
        await newPayment.save();
        res.status(200).json({ message: 'Paymment entered successfully'})
    } catch (error) {
        res.status(500).json({ message: 'Error entering payment', error})
    }
};

//edit a payment
exports.editPayment = (req, res) => {
    const { patientId, amount, amountPaid, method } = req.body;
    try {
        const updatedPayment = Payment.findByIdAndUpdate(patientId,
         {
            amount, amountPaid, method }, {new: true}
        );
        if (!updatedPayment) {
            return res.status(404).json({ message: 'Payment not found'});
        }
        res.status(200).json({ message: 'Paymment edited successfully'})
    } catch (error) {
        res.status(500).json({ message: 'Error editing payment', error})
    }
}

//view appointments
exports.viewAppointments = async(req, res) => {
    const { doctor, patientId, cardNumber } = req.query;
    try{
        let filter = {};
        if (patientId) filter.patient = patientId;
        if(doctor) filter.doctor = doctor;
        if(cardNumber) filter.cardNumber = cardNumber;

        //get appointments based on the filter
        const appointments = await Appointment.find(filter)
        .populate('patient', 'name') //populate the patient details with only name
        .populate('doctor', 'name');

        if(!appointments || appointments.length === 0) {
            return res.status(404).json({ message: 'No appointment found'});
        }
        res.status(200).json({ message: 'Appointments received', appointments })

    } catch (error) {
        res.status(500).json({ message: 'Error fetching appointments', error});
    }
};

