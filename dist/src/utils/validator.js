"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeAccountPasswordValidator = exports.resetAccountPasswordValidator = exports.signInAccountValidator = exports.createAccountValidator = void 0;
const joi_1 = __importDefault(require("joi"));
let regex = /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).{10,16}$/;
exports.createAccountValidator = joi_1.default.object({
    userName: joi_1.default.string().required(),
    email: joi_1.default.string().email().lowercase().trim().required(),
    password: joi_1.default.string().pattern(new RegExp(regex)).required(),
    confirm: joi_1.default.ref("password"),
});
exports.signInAccountValidator = joi_1.default.object({
    email: joi_1.default.string().email().lowercase().trim().required(),
    password: joi_1.default.string().pattern(new RegExp(regex)).required(),
});
exports.resetAccountPasswordValidator = joi_1.default.object({
    email: joi_1.default.string().email().lowercase().trim().required(),
});
exports.changeAccountPasswordValidator = joi_1.default.object({
    password: joi_1.default.string().pattern(new RegExp(regex)).required(),
});
