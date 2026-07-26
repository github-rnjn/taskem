const { z } = require("zod");

const registerSchema = z.object({
    name: z.string().trim().min(2).max(50),

    email: z.string().trim().email(),

    password: z.string().min(8).max(100)
});

const verifyEmailSchema = z.object({
    email: z.string().trim().email(),

    otp: z
        .string()
        .trim()
        .length(6)
});

module.exports = {
    registerSchema,
    verifyEmailSchema
};