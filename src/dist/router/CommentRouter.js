"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const commentController_1 = require("../controller/commentController");
const router = express_1.default.Router();
router.route("/:userID/:productID/create-comment").post(commentController_1.createComment),
    router.route("/:userID/:commentID/delete-comment").delete(commentController_1.deleteComment),
    router.route("/:productID/view-comment").get(commentController_1.viewProductComment);
exports.default = router;
