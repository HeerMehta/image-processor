const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Image = sequelize.define('Image', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    requestId: {
        type: DataTypes.INTEGER,
        references: {
            model: Request,
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    inputImageUrls: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    outputImageUrls: {
        type: DataTypes.TEXT
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'images',
    timestamps: false
});


module.exports = {
    Image
};