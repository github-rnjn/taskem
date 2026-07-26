const Category = require("../models/category.model");

class CategoryRepository {

    async create(data) {
        return Category.create(data);
    }

    async findByUser(userId) {
        return Category.find({
            createdBy: userId
        }).sort({
            createdAt: 1
        });
    }

    async findById(id) {
        return Category.findById(id);
    }

    async findByUserAndNormalizedName(userId, normalizedName) {
        return Category.findOne({
            createdBy: userId,
            normalizedName
        });
    }

    async update(id, data) {
        return Category.findByIdAndUpdate(
            id,
            data,
            {
                new: true,
                runValidators: true
            }
        );
    }

    async delete(id) {
        return Category.findByIdAndDelete(id);
    }
}

module.exports = new CategoryRepository();