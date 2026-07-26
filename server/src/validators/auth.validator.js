const { z } = require("zod");

const registerSchema = z.object({
    name: z.string().min(2).max(50),

    email: z.email(),

    password: z.string().min(8),
});

module.exports = {
    registerSchema,
};