const { default: axios } = require("axios");

const triggerWebhook = async (webhookUrl, payload) => {
    try {
        const response = await axios.post(webhookUrl, {
            ...payload
        });

        console.log(`Webhook triggered for request ID: ${requestId}, response status: ${response.status}`);
    } catch (error) {
        console.error(`Failed to trigger webhook for request ID: ${requestId}`, error.message);
    }
};

module.exports = {
    triggerWebhook
}