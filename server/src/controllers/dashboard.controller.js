const asyncHandler = require("../utils/asyncHandler");

const ApiResponse = require("../utils/ApiResponse");

const { HTTP_STATUS } = require("../constants");

const dashboardService = require("../services/dashboard.service");

const getDashboard = asyncHandler(async (req, res) => {

    const dashboard =
        await dashboardService.getDashboard(
            req.user._id
        );

    return res.status(HTTP_STATUS.OK).json(

        new ApiResponse(
            HTTP_STATUS.OK,
            "Dashboard fetched successfully",
            dashboard
        )

    );

});

module.exports = {
    getDashboard
};