"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controller/authController");
const validatorHolder_1 = __importDefault(require("../utils/validatorHolder"));
const validator_1 = require("../utils/validator");
const router = express_1.default.Router();
const multer_1 = __importDefault(require("multer"));
const myUpload = (0, multer_1.default)().single("avatar");
router.route("/all-accounts").get(authController_1.viewAccounts);
router.route("/:userID/single-account").get(authController_1.viewAccount);
router.route("/:userID/delete").delete(authController_1.deleteAccount);
router
    .route("/create-account")
    .post((0, validatorHolder_1.default)(validator_1.createAccountValidator), authController_1.registerAccount);
router.route("/sign-in-account").post(authController_1.signInAccount);
router.route("/:token/verify-account").post(authController_1.verifiedAccount);
router.route("/:userID/update-account-info").patch(authController_1.updateAccountInfo);
router
    .route("/:userID/update-account-avatar")
    .patch(myUpload, authController_1.updateAccountAvatar);
router.route("/reset-account-password").patch(authController_1.resetAccountPassword);
router.route("/:token/change-account-password").patch(authController_1.changeAccountPassword);
exports.default = router;
