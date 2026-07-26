const User = require("../models/user.model");

class AuthRepository {

    async findByEmail(email) {
        return User.findOne({ email });
    }

    async findById(userId) {
        return User.findById(userId);
    }
    
    async create(userData) {
        return User.create(userData);
    }

    async verifyUser(userId) {
        return User.findByIdAndUpdate(
            userId,
            {
                isVerified: true
            },
            {
                new: true
            }
        );
    }

    async findByEmailWithPassword(email) {
        return User.findOne({
            email
        }).select("+password");
    }

    async updateLastLogin(userId) {
        return User.findByIdAndUpdate(
            userId,
            {
                lastLogin: new Date()
            },
            {
                new: true
            }
        );
    }
}

module.exports = new AuthRepository();