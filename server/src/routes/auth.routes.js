const express = require("express");

const router = express.Router();

const { register,verifyEmail,resendVerification,login,refreshToken,logout } = require("../controllers/auth.controller");

const validate = require("../middlewares/validate.middleware");

const { registerSchema,verifyEmailSchema,resendVerificationSchema,loginSchema } = require("../validators/auth.validator");

const authMiddleware = require("../middlewares/auth.middleware");
router.post(
    "/register",
    validate(registerSchema),
    register
);

router.post(
    "/verify-email",
    validate(verifyEmailSchema),
    verifyEmail
);

router.post(
    "/resend-verification",
    validate(resendVerificationSchema),
    resendVerification
);

router.post(
    "/login",
    validate(loginSchema),
    login
);

router.post(
    "/refresh-token",
    refreshToken
);

router.post(
    "/logout",
    authMiddleware,
    logout
);

module.exports = router;