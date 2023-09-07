import express from "express";
import { Router } from "express";
import {
  createComment,
  deleteComment,
  viewProductComment,
} from "../controller/commentController";

const router = express.Router();

router.route("/:userID/:productID/create-comment").post(createComment),
  router.route("/:userID/:commentID/delete-comment").delete(deleteComment),
  router.route("/:productID/view-comment").get(viewProductComment);

export default router;
