//routes for doctor

const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middlewares/authMiddleware');
const adminController = require('../controllers/doctorController');

//the routes
router.get('/get-records', authenticate, authorize('doctor'), doctorController.getPatientRecords);
router.post('/add-notes', authenticate, authorize('doctor'), doctorController.addDoctorNote);
router.put('/edit-note/:id', authenticate, authorize('doctor'), doctorController.editDoctorNote);
router.get('/view-result/:id', authenticate, authorize('doctor'), doctorController.viewResults);
router.get('/appointments', authenticate, authorize('doctor'), doctorController.viewAppointments);


module.exports = router;