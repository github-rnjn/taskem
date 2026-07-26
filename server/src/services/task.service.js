const ApiError = require("../utils/ApiError");

const { HTTP_STATUS } = require("../constants");

const taskRepository = require("../repositories/task.repository");
const categoryRepository = require("../repositories/category.repository");

class TaskService {

    async create(userId, data) {

        if (data.category) {

            const category =
                await categoryRepository.findByIdAndUser(
                    data.category,
                    userId
                );

            if (!category) {
                throw new ApiError(
                    HTTP_STATUS.NOT_FOUND,
                    "Category not found"
                );
            }

        }

        if (data.labels) {

            data.labels = [
                ...new Set(
                    data.labels
                        .map(label => label.trim().toLowerCase())
                        .filter(Boolean)
                )
            ];

        }

        return taskRepository.create({

            ...data,

            createdBy: userId,

            updatedBy: userId

        });

    }

}

module.exports = new TaskService();