"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
    cloud_name: "druv5bmxf",
    api_key: "283946544459529",
    api_secret: "rY2VzgLUvQXn8XTTNkOtSOBqtmg",
    secure: true,
});
exports.default = cloudinary_1.v2;
