const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },

        refreshToken: {
            type: String,
            required: true,
            select: false,
        },

        deviceName: {
            type: String,
            default: "Unknown Device",
        },

        userAgent: {
            type: String,
        },

        ipAddress: {
            type: String,
        },

        expiresAt: {
            type: Date,
            required: true,
            index: true,
        },

        lastUsedAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

sessionSchema.index(
    {
        expiresAt: 1,
    },
    {
        expireAfterSeconds: 0,
    }
);

module.exports = mongoose.model("Session", sessionSchema);