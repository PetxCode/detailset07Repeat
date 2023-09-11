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
exports.mainApp = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const authRouter_1 = __importDefault(require("./router/authRouter"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const storeRouter_1 = __importDefault(require("./router/storeRouter"));
const CommentRouter_1 = __importDefault(require("./router/CommentRouter"));
const mainApp = (app) => {
    app.use((0, cors_1.default)());
    app.use((0, morgan_1.default)("dev"));
    app.use((0, helmet_1.default)());
    app.use(express_1.default.json());
    app.set("view engine", "ejs");
    app.use("/api", authRouter_1.default);
    app.use("/api", storeRouter_1.default);
    app.use("/api", CommentRouter_1.default);
    app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return res.status(200).json({
                message: "This is the Test...",
            });
        }
        catch (error) {
            return res.status(404).json({
                message: "Error",
                data: error,
            });
        }
    }));
};
exports.mainApp = mainApp;
