const express = require('express');
const multer = require('multer');
const { processDataFromCSV } = require('../controllers/requestController');
const { handleProcessedImages } = require('../controllers/imageController');
const router = express.Router();

const upload = multer({
    dest: 'uploads/'
});

router.post('/upload', upload.single('file'), processDataFromCSV);
router.post('/update-database', handleProcessedImages)

module.exports = router;
