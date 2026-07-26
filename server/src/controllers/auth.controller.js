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

module.exports = {
    register
};