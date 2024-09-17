const express = require('express');
const router = express.Router();
const labController = require('../controllers/labController');
const upload = require('../config/multerConfig');  // Multer setup

// Route to add lab result with file upload
router.post('/addResult', upload.single('resultFile'), labController.addLabResult);

// Route to edit lab result (if you want file updates, include Multer)
router.put('/editResult', upload.single('resultFile'), labController.editResult);

module.exports = router;
