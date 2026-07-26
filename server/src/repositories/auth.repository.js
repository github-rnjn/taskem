const User = require("../models/user.model");

class AuthRepository {
    async findByEmail(email) {
        return User.findOne({ email });
    }

    async create(userData) {
        return User.create(userData);
    }
}

module.exports = new AuthRepository();