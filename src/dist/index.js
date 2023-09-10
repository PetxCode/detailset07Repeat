"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mainApp_1 = require("./mainApp");
const app = (0, express_1.default)();
const port = 1122;
(0, mainApp_1.mainApp)(app);
const server = app.listen(process.env.PORT || port, () => {
    console.log();
    console.log("server connected");
});
process.on("uncaughtException", (error) => {
    console.log(`shutting down due to uncaughtException: ${error}`);
    process.exit(1);
});
process.on("unhandledRejection", (reason) => {
    console.log(`shutting down due to unhandledRejection: ${reason}`);
    server.close(() => {
        process.exit(1);
    });
});
