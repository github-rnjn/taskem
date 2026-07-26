const Task = require("../models/task.model");

class TaskRepository {

    async create(data) {

        const task = await Task.create(data);

        return Task.findById(task._id)
            .populate("category", "name color icon");

    }

    async findById(id) {
        return Task.findById(id)
            .populate("category", "name color icon");
    }

    async findAll(userId, filters, options) {

        const {
            page,
            limit,
            sort
        } = options;

        const skip = (page - 1) * limit;

        const [tasks, total] = await Promise.all([

            Task.find({
                createdBy: userId,
                isArchived: false,
                ...filters
            })
                .populate("category", "name color icon")
                .sort(sort)
                .skip(skip)
                .limit(limit),

            Task.countDocuments({
                createdBy: userId,
                isArchived: false,
                ...filters
            })

        ]);

        return {
            tasks,
            total
        };

    }

    async findByIdAndUser(categoryId, userId) {
        return Category.findOne({
            _id: categoryId,
            createdBy: userId
        });
    }
}

module.exports = new TaskRepository();