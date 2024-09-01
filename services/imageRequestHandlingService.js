const sharp = require('sharp');
const axios = require('axios');
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const triggerWebhook = require('./webhookService')

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

const downloadImage = async (url) => {
    const response = await axios({
        url,
        responseType: 'arraybuffer'
    });
    return response.data;
};

const compressImage = async (imageBuffer) => {
    return await sharp(imageBuffer)
        .jpeg({ quality: 50 })
        .toBuffer();
};

const uploadToS3 = async (buffer, productName) => {
    const fileName = `${productName}-${uuidv4()}.jpg`;
    const uploadParams = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: fileName,
        Body: buffer,
        ContentType: 'image/jpeg',
        ACL: 'public-read'
    };

    const data = await s3.upload(uploadParams).promise();
    return data.Location;
};

const handleImages = async (imageUrls, productName, requestId) => {
    const outputUrls = [];

    for (const url of imageUrls) {
        try {
            const imageBuffer = await downloadImage(url);
            const compressedImage = await compressImage(imageBuffer);
            const uploadedImageUrl = await uploadToS3(compressedImage, productName);
            outputUrls.push(uploadedImageUrl);
        } catch (error) {
            console.error(`Failed to process image at URL: ${url}`, error.message);
        }
    }

    const processedImageURLs = outputUrls.join(',');
    triggerWebhook('/update-database', {
        requestId: requestId, 
        processedImageURLs: processedImageURLs
    })

    return outputUrls;
};

module.exports = {
    handleImages
};
