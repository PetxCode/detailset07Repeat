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
Object.defineProperty(exports, "__esModule", { value: true });
exports.viewAllReply = exports.createReply = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createReply = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { reply } = req.body;
        const { userID, commentID } = req.params;
        const user = yield prisma.authModel.findUnique({
            where: { id: userID },
        });
        const comment = yield prisma.commentModel.findUnique({
            where: { id: commentID },
            include: { reply: true },
        });
        if (user && comment) {
            const replied = yield prisma.replyModel.create({
                data: {
                    reply,
                    commentID,
                },
            });
            comment.reply.push(replied);
            return res.status(201).json({
                message: "reply created",
                data: replied,
            });
        }
        else {
            return res.status(404).json({
                messsage: "Error",
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            message: "error",
        });
    }
});
exports.createReply = createReply;
const viewAllReply = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID, commentID } = req.params;
        const comment = yield prisma.commentModel.findUnique({
            where: {
                id: commentID,
            },
        });
        const user = yield prisma.authModel.findUnique({
            where: {
                id: userID,
            },
        });
        if (user && comment) {
            const reply = yield prisma.replyModel.findMany({});
            return res.status(201).json({
                message: "All replied comment gotten",
                data: reply,
            });
        }
        else {
            return res.status(401).json({
                message: "Error replying comment",
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            message: "error",
        });
    }
});
exports.viewAllReply = viewAllReply;
