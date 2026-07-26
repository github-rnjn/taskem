const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const {HTTPS_STATUS} = require("../constants/index")

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

    return res.status(200).json(

        new ApiResponse(
            200,
            "Token refreshed successfully",
            {
                accessToken: result.accessToken
            }
        )

    );

});

module.exports = {
    register,
    login,
    verifyEmail,
    resendVerification,
    refreshToken
};