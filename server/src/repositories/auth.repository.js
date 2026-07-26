const User = require("../models/user.model");

class AuthRepository {

    async findByEmail(email) {
        return User.findOne({ email });
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

}

module.exports = new AuthRepository();