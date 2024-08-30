const express = require('express');
const multer = require('multer');
const csvParser = require('csv-parser');
const path = require('path');
const fs = require('fs');

const app = express();

const upload = multer({
    dest: 'uploads/'
});


app.post('/upload', upload.single('file'), (req, res) => {
    const csvFilePath = path.join(__dirname, req.file.path);

    
    if (path.extname(req.file.originalname).toLowerCase() !== '.csv') {
        return res.status(400).json({ message: 'Please upload a valid CSV file' });
    }

    const results = [];

    
    fs.createReadStream(csvFilePath)
        .pipe(csvParser())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            
            console.log(results);

            
            fs.unlinkSync(csvFilePath);

            
            const requestId = generateUniqueRequestId(); 
            res.status(200).json({ requestId: requestId });
        })
        .on('error', (err) => {
            res.status(500).json({ message: 'Error processing CSV file', error: err.message });
        });
});

function generateUniqueRequestId() {
    return Date.now().toString();
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
