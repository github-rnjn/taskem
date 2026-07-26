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

module.exports = {
    register,
    verifyEmail
};