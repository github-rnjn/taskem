const express = require("express");

const router = express.Router();

const { register,verifyEmail,resendVerification,login } = require("../controllers/auth.controller");

const validate = require("../middlewares/validate.middleware");

const { registerSchema,verifyEmailSchema,resendVerificationSchema,loginSchema } = require("../validators/auth.validator");

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

module.exports = router;