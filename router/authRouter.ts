import express from "express";
import {
  changeAccountPassword,
  deleteAccount,
  registerAccount,
  resetAccountPassword,
  signInAccount,
  updateAccountInfo,
  verifiedAccount,
  viewAccount,
  viewAccounts,
} from "../controller/authController";
import { upload } from "../utils/multer";
import validatorHolder from "../utils/validatorHolder";
import { createAccountValidator } from "../utils/validator";
const router = express.Router();

router.route("/all-accounts").get(viewAccounts);
router.route("/:userID/single-account").get(viewAccount);
router.route("/:userID/delete").delete(deleteAccount);

router
  .route("/create-account")
  .post(validatorHolder(createAccountValidator), registerAccount);

router.route("/sign-in-account").post(signInAccount);

router.route("/:token/verify-account").post(verifiedAccount);

router.route("/:userID/update-account-info").patch(updateAccountInfo);
router.route("/:userID/update-account-avatar").patch(upload, updateAccountInfo);
router.route("/reset-account-password").patch(resetAccountPassword);

router.route("/:token/change-account-password").patch(changeAccountPassword);

export default router;
