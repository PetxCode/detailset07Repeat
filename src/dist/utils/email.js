"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetAccountPasswordMail = exports.sendAccountOpeningMail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const ejs_1 = __importDefault(require("ejs"));
const path_1 = __importDefault(require("path"));
const googleapis_1 = require("googleapis");
const GOOGLE_ID = "848542784186-9os7noa7qvcg3nckfu38s3bhob8u6oga.apps.googleusercontent.com";
const GOOGLE_SECRET = "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";
const GOOGLE_REFRESH_TOKEN = "1//04GgN8ydoI_ZdCgYIARAAGAQSNwF-L9IrKCOkFE95PncupZNTb3WCiygNcFb1vp20oW-1SMJTKzSWxnWw2B6nf4S85GXSTpgR44M";
const GOOGLE_URL = "https://developers.google.com/oauthplayground";
const oAuth = new googleapis_1.google.auth.OAuth2(GOOGLE_ID, GOOGLE_SECRET, GOOGLE_URL);
oAuth.setCredentials({ access_token: GOOGLE_REFRESH_TOKEN });
const url = "http://localhost:5173";
const sendAccountOpeningMail = (user, tokenID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getAccess = (yield oAuth.getAccessToken()).token;
        const transport = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: "codelabbest@gmail.com",
                clientId: GOOGLE_ID,
                clientSecret: GOOGLE_SECRET,
                refreshToken: GOOGLE_REFRESH_TOKEN,
                accessToken: getAccess,
            },
        });
        const passedData = {
            userName: user.userName,
            url: `${url}/${tokenID}/verify-account`,
        };
        const readData = path_1.default.join(__dirname, "../views/accountOpening.ejs");
        const data = yield ejs_1.default.renderFile(readData, passedData);
        const mailer = {
            from: "Congrate 🚀🚀🚀 <codelabbest@gmail.com>",
            to: user.email,
            subject: "Awesome",
            html: data,
        };
        transport.sendMail(mailer);
    }
    catch (error) {
        console.log(error);
    }
});
exports.sendAccountOpeningMail = sendAccountOpeningMail;
const resetAccountPasswordMail = (user, tokenID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getAccess = (yield oAuth.getAccessToken()).token;
        const transport = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: "codelabbest@gmail.com",
                clientId: GOOGLE_ID,
                clientSecret: GOOGLE_SECRET,
                refreshToken: GOOGLE_REFRESH_TOKEN,
                accessToken: getAccess,
            },
        });
        const passedData = {
            userName: user.userName,
            url: `${url}/${tokenID}/verify-account`,
        };
        const readData = path_1.default.join(__dirname, "../views/resetPassword.ejs");
        const data = yield ejs_1.default.renderFile(readData, passedData);
        const mailer = {
            from: "Congrate 🚀🚀🚀 <codelabbest@gmail.com>",
            to: user.email,
            subject: "Awesome",
            html: data,
        };
        transport.sendMail(mailer);
    }
    catch (error) {
        console.log(error);
    }
});
exports.resetAccountPasswordMail = resetAccountPasswordMail;
