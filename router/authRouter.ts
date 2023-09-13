import express from "express";
import {
  changeAccountPassword,
  deleteAccount,
  registerAccount,
  registerAdminAccount,
  registerDispacherAccount,
  resetAccountPassword,
  signInAccount,
  updateAccountAvatar,
  updateAccountInfo,
  verifiedAccount,
  viewAccount,
  viewAccounts,
} from "../controller/authController";
import validatorHolder from "../utils/validatorHolder";
import {
  createAccountValidator,
  createAdminAccountValidator,
  createDispatchAccountValidator,
} from "../utils/validator";
const router = express.Router();
import multer from "multer";

const myUpload = multer().single("avatar");

router.route("/all-accounts").get(viewAccounts);
router.route("/:userID/single-account").get(viewAccount);
router.route("/:userID/delete").delete(deleteAccount);

router
  .route("/create-account")
  .post(validatorHolder(createAccountValidator), registerAccount);

router.route("/sign-in-account").post(signInAccount);

router.route("/:token/verify-account").post(verifiedAccount);
router
  .route("/register-dispatch")
  .post(
    validatorHolder(createDispatchAccountValidator),
    registerDispacherAccount
  );

router
  .route("/register-admin")
  .post(validatorHolder(createAdminAccountValidator), registerAdminAccount);

router.route("/:userID/update-account-info").patch(updateAccountInfo);
router
  .route("/:userID/update-account-avatar")
  .patch(myUpload, updateAccountAvatar);
router.route("/reset-account-password").patch(resetAccountPassword);

router.route("/:token/change-account-password").patch(changeAccountPassword);

export default router;
