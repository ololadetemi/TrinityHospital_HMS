//this is a controller for the lab technicians to upload patient results
const Result = require('../models/resultModel');
const User = require('../models/userModel');


//adding patient result
exports.addLabResult = async(req, res) => {
    const { patientName, testName, result, notes} = req.body;
    const technician = req.user.id;

    try{
        const newResult = new Result ({
            patientName,
            technician,
            type: 'Lab',
            testName,
            result,
            resultFile: req.file ? `/uploads/results/${req.file.filename}` : null,  // Store file path if there's an upload
            notes   
        });
        await newResult.save();
        res.status(200).json({ message: 'Result uploaded', result: newResult});
    } catch (error) {
        res.status(500).json({ message: 'Error uploading results', error});
    }
};

//editing patient result
exports.editResult = async(req, res) => {
    const { resultId, patientName, resultFile, testName, result} = req.body;
    try {
        const updatedResult = Result.findByIdAndUpdate(resultId,
            {
                patientName, testName, resultFile, result}, { new: true}
    );
    if (!updatedResult) {
        return res.status(404).json({ message: 'Result not found'});
    }
    res.status(200).json({ message: 'Result edited successfully', result: updatedResult});
    } catch (error) {
        res.status(500).json({ message: 'Error editing result', error });
    }
};