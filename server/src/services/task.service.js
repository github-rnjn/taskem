const ApiError = require("../utils/ApiError");

const { HTTP_STATUS } = require("../constants");

const taskRepository = require("../repositories/task.repository");
const categoryRepository = require("../repositories/category.repository");

const allowedSortFields = [
    "createdAt",
    "updatedAt",
    "dueDate",
    "priority",
    "status",
    "title",
];

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

    async getAll(userId, query) {

        const page = Number(query.page) || 1;
        const limit = Number(query.limit) || 10;

        const filters = {};

        if (query.status)
            filters.status = query.status;

        if (query.priority)
            filters.priority = query.priority;

        if (query.category)
            filters.category = query.category;

        if (query.search) {
            filters.$or = [
                {
                    title: {
                        $regex: query.search,
                        $options: "i"
                    }
                },
                {
                    description: {
                        $regex: query.search,
                        $options: "i"
                    }
                }
            ];
        }

        const sortBy = allowedSortFields.includes(query.sortBy)?query.sortBy:"createdAt";

        const sortOrder =
            query.sortOrder === "asc"
                ? 1
                : -1;

        const result =
            await taskRepository.findAll(

                userId,

                filters,

                {
                    page,
                    limit,
                    sort: {
                        [sortBy]: sortOrder
                    }
                }

            );

        return {

            tasks: result.tasks,

            pagination: {

                page,

                limit,

                total: result.total,

                totalPages:
                    Math.ceil(result.total / limit),

                hasNextPage:
                    page * limit < result.total,

                hasPreviousPage:
                    page > 1

            }

        };

    }

}

module.exports = new TaskService();