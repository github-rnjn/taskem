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

    async findByUser(userId) {
        return Task.find({
            createdBy: userId,
            isArchived: false,
        })
            .populate("category", "name color icon")
            .sort({
                createdAt: -1,
            });
    }

    async findByIdAndUser(categoryId, userId) {
        return Category.findOne({
            _id: categoryId,
            createdBy: userId
        });
    }
}

module.exports = new TaskRepository();