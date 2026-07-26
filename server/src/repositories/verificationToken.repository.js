const VerificationToken = require("../models/verificationToken.model");

class VerificationTokenRepository {
    async create(data) {
        return VerificationToken.create(data);
    }

    async findByUser(userId, type) {
        return VerificationToken.findOne({
            user: userId,
            type,
        }).select("+tokenHash");
    }

    async deleteByUser(userId, type) {
        return VerificationToken.deleteOne({
            user: userId,
            type,
        });
    }

    async deleteById(id) {
        return VerificationToken.findByIdAndDelete(id);
    }
}

module.exports = new VerificationTokenRepository();