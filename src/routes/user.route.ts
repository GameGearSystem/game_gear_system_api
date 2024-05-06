import express from "express";
import { createUser, getUsers, confirmationUser, loginUser, sendUserConfirmationEmail, forgotPassword, resetPassword, getMe } from "../controllers/user.controller";
import tokenValidatorMiddleware from "../core/middlewares/token-validator.middleware";

const router = express.Router();

router.get("/confirmation", confirmationUser);
router.get("/", tokenValidatorMiddleware, getUsers);
router.get("/me", tokenValidatorMiddleware, getMe)
router.post("/login", loginUser);
router.post("/resend_confirmation", sendUserConfirmationEmail)
router.post("/forgot_password", forgotPassword)
router.post("/reset_password", resetPassword)
router.post("/", createUser);

export default router;
