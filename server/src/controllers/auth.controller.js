const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const {HTTP_STATUS} = require("../constants/index");

const env = require("../config/env");

const authService = require("../services/auth.service");

const register = asyncHandler(async (req, res) => {

    const user = await authService.register(req.body);

    return res.status(201).json(

        new ApiResponse(
            201,
            "User registered successfully",
            {
                id: user._id,
                name: user.name,
                email: user.email
            }
        )

    );

});

const login = asyncHandler(async (req, res) => {

    const deviceInfo = {
        deviceName: req.headers["sec-ch-ua"] || "Unknown Device",
        userAgent: req.headers["user-agent"],
        ipAddress: req.ip
    };

    const result = await authService.login(
        req.body,
        deviceInfo
    );

    res.cookie("refreshToken", result.refreshToken, {

        httpOnly: true,

        secure: process.env.NODE_ENV === "production",

        sameSite: "strict",

        maxAge: 7 * 24 * 60 * 60 * 1000

    });

    return res.status(200).json(

        new ApiResponse(
            200,
            "Login successful",
            {
                accessToken: result.accessToken,

                user: {
                    id: result.user._id,
                    name: result.user.name,
                    email: result.user.email
                }
            }
        )

    );

});

const verifyEmail = asyncHandler(async (req, res) => {

    const { email, otp } = req.body;

    await authService.verifyEmail(email, otp);

    return res.status(200).json(

        new ApiResponse(
            200,
            "Email verified successfully"
        )

    );

});

const resendVerification = asyncHandler(async (req, res) => {

    await authService.resendVerification(req.body.email);

    return res.status(200).json(
        new ApiResponse(
            200,
            "Verification code sent successfully"
        )
    );

});

const refreshToken = asyncHandler(async (req, res) => {

    const token = req.cookies.refreshToken;

    const result =
        await authService.refreshToken(token);

    res.cookie(
        "refreshToken",
        result.refreshToken,
        {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        }
    );

    return new ApiResponse(
        HTTP_STATUS.OK,
        "Token refreshed successfully",
        {
            accessToken,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        }
    );

});

const logout = asyncHandler(async (req, res) => {

    const refreshToken = req.cookies.refreshToken;

    await authService.logout(req.user._id,req.cookies.refreshToken);

    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: env.NODE_ENV === "production",
        sameSite: "strict"
    });

    return res.status(200).json(
        new ApiResponse(
            HTTP_STATUS.OK,
            "Logged out successfully"
        )
    );

});

const forgotPassword = asyncHandler(async (req, res) => {

    await authService.forgotPassword(
        req.body.email
    );

    return res.status(200).json(

        new ApiResponse(

            HTTP_STATUS.OK,

            "Password reset code sent successfully"

        )

    );

});

const resetPassword = asyncHandler(async (req, res) => {

    const {
        email,
        otp,
        password
    } = req.body;

    await authService.resetPassword(
        email,
        otp,
        password
    );

    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: env.NODE_ENV === "production",
        sameSite: "strict"
    });

    return res.status(200).json(

        new ApiResponse(
            HTTP_STATUS.OK,
            "Password reset successfully"
        )

    );

});

module.exports = {
    register,
    login,
    logout,
    verifyEmail,
    resendVerification,
    refreshToken,
    forgotPassword,
    resetPassword
};