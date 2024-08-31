const express = require('express');
const multer = require('multer');
const { uploadCSV } = require('../controllers/requestController');
const router = express.Router();

const upload = multer({
    dest: 'uploads/'
});

router.post('/upload', upload.single('file'), uploadCSV);

module.exports = router;
