const { Request, Image } = require('../models');

const updateOutputImageUrls = async (requestId, processedImageUrls) => {
    try {
        await Image.update(
            { outputImageUrls: processedImageUrls },
            { where: { requestId: requestId } }
        );

        console.log(`Successfully updated output image URLs for request ID: ${requestId}`);
    } catch (error) {
        console.error('Error updating output image URLs:', error.message);
        throw error;
    }
};

const updateRequestStatus = async (requestId) => {
    try {
        await Request.update(
            { requestStatus: 1},
            { where: { requestId: requestId } }
        );

        console.log(`Successfully updated request status for request ID: ${requestId}`);
    } catch (error) {
        console.error('Error updating request status:', error.message);
        throw error;
    }
};


const updateDatabaseFromProcessedImages = async (requestId, processedImageUrls) => {
    try{
        await updateOutputImageUrls(requestId, processedImageUrls);
        await updateRequestStatus(requestId);
    }
    catch (error) {
        console.error('Error updating output image URLs:', error.message);
        throw error;
    }
}

module.exports = {
    updateDatabaseFromProcessedImages,
};
