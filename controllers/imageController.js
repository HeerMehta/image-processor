const { updateDatabaseFromProcessedImages } = require("../repository/imageRequestRepository");

const handleProcessedImages = async (req, res) => {
    try{
        const {requestId, processedImageURLs} = req;
        await updateDatabaseFromProcessedImages(requestId, processedImageURLs);
        res.status(200).json({ message: 'Sucessfully updated Database' });
    }
    catch (error){
        res.status(500).json({ message: 'Error updating database', error: err.message });
    }
}

module.exports = {
    handleProcessedImages
}