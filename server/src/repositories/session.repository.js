const Session = require("../models/session.model");

class SessionRepository {
    async create(sessionData) {
        return Session.create(sessionData);
    }

    async findByRefreshToken(refreshToken) {
        return Session.findOne({ refreshToken });
    }

    async deleteById(id) {
        return Session.findByIdAndDelete(id);
    }

    async deleteAllByUser(userId) {
        return Session.deleteMany({ user: userId });
    }

    async updateLastUsed(id) {
        return Session.findByIdAndUpdate(
            id,
            {
                lastUsedAt: new Date(),
            },
            {
                new: true,
            }
        );
    }
}

module.exports = new SessionRepository();