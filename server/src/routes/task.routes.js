const express = require("express");

const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");
const validate = require("../middlewares/validate.middleware");

const {
    createTask,
    getTasks
} = require("../controllers/task.controller");

const {
    createTaskSchema
} = require("../validators/task.validator");

router.post(
    "/",
    authMiddleware,
    validate(createTaskSchema),
    createTask
);

router.get(
    "/",
    authMiddleware,
    getTasks
);

module.exports = router;