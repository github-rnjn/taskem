const { z } = require("zod");

const createTaskSchema = z.object({

    title: z
        .string()
        .trim()
        .min(2)
        .max(150),

    description: z
        .string()
        .trim()
        .optional(),

    priority: z
        .enum([
            "LOW",
            "MEDIUM",
            "HIGH"
        ])
        .optional(),

    dueDate: z
        .string()
        .datetime()
        .optional(),

    category: z
        .string()
        .optional(),

    labels: z
        .array(z.string())
        .optional(),

    estimatedMinutes: z
        .number()
        .min(0)
        .optional()

});

module.exports = {
    createTaskSchema
};