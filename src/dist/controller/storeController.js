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
exports.rateProduct = exports.deleteProduct = exports.updateProduct = exports.viewSingleUserProduct = exports.viewSingleProduct = exports.viewProduct = exports.createProduct = void 0;
const client_1 = require("@prisma/client");
const uploadHelper_1 = require("../utils/uploadHelper");
const prisma = new client_1.PrismaClient();
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const { title, category, description, cost } = req.body;
        const { secure_url, public_id } = yield (0, uploadHelper_1.streamUpload)(req);
        const user = yield prisma.authModel.findUnique({
            where: { id: userID },
            include: { store: true },
        });
        if (user) {
            const product = yield prisma.storeModel.create({
                data: {
                    title,
                    category,
                    description,
                    cost: parseInt(cost),
                    userID,
                    image: secure_url,
                    imageID: public_id,
                    rate: 0,
                },
            });
            user.store.push(product);
            return res.status(201).json({
                message: "product created successfully",
                data: user,
            });
        }
        else {
            return res.status(404).json({
                message: "user not found",
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            message: "Error",
            data: error,
        });
    }
});
exports.createProduct = createProduct;
const viewProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield prisma.storeModel.findMany({});
        return res.status(200).json({
            message: "viewing all Product",
            data: product,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Error",
        });
    }
});
exports.viewProduct = viewProduct;
const viewSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productID } = req.params;
        const product = yield prisma.storeModel.findUnique({
            where: { id: productID },
            include: { comments: true },
        });
        return res.status(200).json({
            message: "viewing single Product",
            data: product,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Error",
        });
    }
});
exports.viewSingleProduct = viewSingleProduct;
const viewSingleUserProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const user = yield prisma.authModel.findUnique({
            where: { id: userID },
            include: { store: true },
        });
        if (user) {
            return res.status(201).json({
                message: "view user product",
                data: user.store,
            });
        }
        else {
            return res.status(404).json({
                message: "user not found",
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            message: "Error",
        });
    }
});
exports.viewSingleUserProduct = viewSingleUserProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productID } = req.params;
        const { cost } = req.body;
        const product = yield prisma.storeModel.update({
            where: { id: productID },
            data: { cost: parseInt(cost) },
        });
        return res.status(201).json({
            message: "product cost update",
            data: product,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Error",
        });
    }
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productID } = req.params;
        const user = yield prisma.storeModel.delete({
            where: { id: productID },
        });
        if (user) {
            return res.status(201).json({
                message: "delete product",
                // data: user.store,
            });
        }
        else {
            return res.status(404).json({
                message: "product not found",
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            message: "Error",
        });
    }
});
exports.deleteProduct = deleteProduct;
const rateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { productID, userID } = req.params;
        const { rating } = req.body;
        const user = yield prisma.authModel.findUnique({
            where: { id: userID },
        });
        const stored = yield prisma.storeModel.findUnique({
            where: { id: productID },
        });
        let total = (_a = stored === null || stored === void 0 ? void 0 : stored.rating) === null || _a === void 0 ? void 0 : _a.reduce((a, b) => {
            return a + b;
        }, 0);
        if (user) {
            let totalLenght = stored === null || stored === void 0 ? void 0 : stored.rating.length;
            stored === null || stored === void 0 ? void 0 : stored.rating.push(rating);
            let rated = Math.ceil(total / totalLenght);
            const product = yield prisma.storeModel.update({
                where: { id: productID },
                data: { rating: stored === null || stored === void 0 ? void 0 : stored.rating, rate: rated },
            });
            return res.status(201).json({
                message: "rated successfully",
                data: product,
            });
        }
        else {
        }
    }
    catch (error) {
        return res.status(404).json({
            message: "Error",
            data: error,
        });
    }
});
exports.rateProduct = rateProduct;
