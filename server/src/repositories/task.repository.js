const Task = require("../models/task.model");

class TaskRepository {

    async create(data) {
        return Task.create(data);
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

}

module.exports = new TaskRepository();