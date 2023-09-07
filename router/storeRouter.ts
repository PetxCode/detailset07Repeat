import express from "express";
import {
  createProduct,
  deleteProduct,
  rateProduct,
  updateProduct,
  viewProduct,
  viewSingleProduct,
  viewSingleUserProduct,
} from "../controller/storeController";
import multer from "multer";
const productImage = multer().single("product");

const router = express.Router();

router.route("/:userID/create-product").post(productImage, createProduct);

router.route("/view-products").get(viewProduct);
router.route("/:userID/view-user-products").get(viewSingleUserProduct);
router.route("/:productID/view-single-products").get(viewSingleProduct);

router.route("/:productID/update-product").patch(updateProduct);

router.route("/:productID/delete-product").delete(deleteProduct);
router.route("/:userID/:productID/rate-product").patch(rateProduct);

export default router;
