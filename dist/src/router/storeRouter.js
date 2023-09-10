"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const storeController_1 = require("../controller/storeController");
const multer_1 = __importDefault(require("multer"));
const productImage = (0, multer_1.default)().single("product");
const router = express_1.default.Router();
router.route("/:userID/create-product").post(productImage, storeController_1.createProduct);
router.route("/view-products").get(storeController_1.viewProduct);
router.route("/:userID/view-user-products").get(storeController_1.viewSingleUserProduct);
router.route("/:productID/view-single-products").get(storeController_1.viewSingleProduct);
router.route("/:productID/update-product").patch(storeController_1.updateProduct);
router.route("/:productID/delete-product").delete(storeController_1.deleteProduct);
router.route("/:userID/:productID/rate-product").patch(storeController_1.rateProduct);
exports.default = router;
