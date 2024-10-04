const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middlewares/authMiddleware');
const receptionistController = require('../controllers/receptionistController');

router.post('/create-patient', authenticate, authorize('receptionist'), receptionistController.createPatient);
router.post('/create-appointment', authenticate, authorize('receptionist'), receptionistController.createAppointment);
router.put('/edit-appointment/:id', authenticate, authorize('receptionist'), receptionistController.editAppointment);
router.delete('/delete-appointment', authenticate, authorize('receptionist'), receptionistController.removeAppointment);
router.put('/edit-payment/:id', authenticate, authorize('receptionist'), receptionistController.editPayment);
router.get('/view-appointment', authenticate, authorize('receptionist'), receptionistController.viewAppointments);

module.exports = router;
