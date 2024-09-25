const express = require('express');
const router = express.Router();
const labController = require('../controllers/labController');
const { authenticate, authorize } = require('../middlewares/authMiddleware');
const upload = require('../config/multerConfig');  // Multer setup

// Route to add lab result with file upload
router.post('/addResult', authenticate, authorize('lab_technician'), upload.single('resultFile'), labController.addLabResult);

// Route to edit lab result (if you want file updates, include Multer)
router.put('/editResult/:id', authenticate, authorize('lab_technician'), upload.single('resultFile'), labController.editResult);

module.exports = router;
