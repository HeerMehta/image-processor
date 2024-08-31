// models/requestModel.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');  // Adjust the path as necessary

// Define the Request model
const Request = sequelize.define('Request', {
    requestId: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    productName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    inputImageUrls: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    outputImageUrls: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'processing',
    },
}, {
    tableName: 'requests',
    timestamps: true,
});

module.exports = Request;
