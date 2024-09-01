const { Image } = require("./imageModel");
const { Request } = require("./requestModel");

Request.hasMany(Image, { foreignKey: 'requestId' });
Image.belongsTo(Request, { foreignKey: 'requestId' });


module.exports = {
    Request,
    Image
};