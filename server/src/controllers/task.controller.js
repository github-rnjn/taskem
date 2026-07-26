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

const getTasks = asyncHandler(async (req, res) => {

    const result =
        await taskService.getAll(
            req.user._id,
            req.query
        );

    return res.status(200).json(

        new ApiResponse(
            200,
            "Tasks fetched successfully",
            result
        )

    );

});

module.exports = {
    createTask,
    getTasks
};