const express = require("express");

const router = express.Router();

const { register,verifyEmail } = require("../controllers/auth.controller");

const validate = require("../middlewares/validate.middleware");

const { registerSchema,verifyEmailSchema } = require("../validators/auth.validator");

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

module.exports = router;