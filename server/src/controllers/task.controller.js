const asyncHandler = require("../utils/asyncHandler");

const ApiResponse = require("../utils/ApiResponse");

const { HTTP_STATUS } = require("../constants");

const taskService = require("../services/task.service");

const createTask = asyncHandler(async (req, res) => {

    const task =
        await taskService.create(
            req.user._id,
            req.body
        );

    return res.status(HTTP_STATUS.CREATED).json(

        new ApiResponse(
            HTTP_STATUS.CREATED,
            "Task created successfully",
            task
        )

    );

});

module.exports = {
    createTask
};