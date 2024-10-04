//routes for the admin

const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middlewares/authMiddleware');
const adminController = require('../controllers/adminController');

//the routes
router.post('/create-user', authenticate, authorize('admin'), adminController.createUser);

router.put('/update-user/:id', authenticate, authorize('admin'), adminController.updateUser);

router.delete('/delete-user/:id', authenticate, authorize('admin'), adminController.deleteUser);

router.get('/get-users', authenticate, authorize('admin'), adminController.getAllUsers);

router.get('/get-user/:id', authenticate, authorize('admin'), adminController.getUserById);

router.get('/payment/', authenticate, authorize('admin'), adminController.viewPayment);

router.get('/appointment', authenticate, authorize('admin'), adminController.viewAppointments);


module.exports = router;