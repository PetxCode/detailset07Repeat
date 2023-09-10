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
exports.viewProductComment = exports.deleteComment = exports.createComment = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID, productID } = req.params;
        const { comment } = req.body;
        const user = yield prisma.authModel.findUnique({
            where: { id: userID },
        });
        const product = yield prisma.storeModel.findUnique({
            where: {
                id: productID,
            },
            include: { comments: true },
        });
        if (user && product) {
            const message = yield prisma.commentModel.create({
                data: {
                    comment,
                    storeID: productID,
                    userID,
                },
            });
            product.comments.push(message);
            return res.status(201).json({
                message: "comment created",
                data: product.comments,
            });
        }
        else {
            return res.status(404).json({
                message: "Error making comment",
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            message: "error creating comment",
        });
    }
});
exports.createComment = createComment;
const deleteComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { commentID, userID } = req.params;
        const user = yield prisma.authModel.findUnique({
            where: { id: userID },
        });
        const commented = yield prisma.commentModel.findUnique({
            where: {
                id: commentID,
            },
        });
        console.log(user === null || user === void 0 ? void 0 : user.id);
        console.log(user === null || user === void 0 ? void 0 : user.id, commented === null || commented === void 0 ? void 0 : commented.userID);
        if ((user === null || user === void 0 ? void 0 : user.id) === (commented === null || commented === void 0 ? void 0 : commented.userID)) {
            yield prisma.commentModel.delete({
                where: { id: commentID },
            });
            return res.status(201).json("comment deleted");
        }
        else {
            return res.status(404).json({
                message: "na you comment am?",
            });
        }
    }
    catch (error) {
        return res
            .status(404)
            .json({ message: "error deleting comment", data: error });
    }
});
exports.deleteComment = deleteComment;
const viewProductComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productID } = req.params;
        const viewProduct = yield prisma.storeModel.findUnique({
            where: { id: productID },
            include: { comments: true },
        });
        return res.status(200).json({
            message: "All Product Comment",
            data: viewProduct === null || viewProduct === void 0 ? void 0 : viewProduct.comments,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Error viewing comment",
        });
    }
});
exports.viewProductComment = viewProductComment;
