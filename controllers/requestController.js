const csvParser = require('csv-parser');
const path = require('path');
const fs = require('fs');

const setDataFromCSV = (req, res) => {
    const csvFilePath = path.join(__dirname, '../', req.file.path);

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
};

function generateUniqueRequestId() {
    return Date.now().toString();
}

module.exports = {
    setDataFromCSV,
};
