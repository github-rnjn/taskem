const ApiError = require("../utils/ApiError");
const authRepository = require("../repositories/auth.repository");
const { HTTP_STATUS } = require("../constants");

class AuthService {
    async register(data) {

        const existingUser = await authRepository.findByEmail(data.email);

        if (existingUser) {
            throw new ApiError(
                HTTP_STATUS.CONFLICT,
                "Email already registered"
            );
        }

        const user = await authRepository.create(data);

        return user;
    }
}

module.exports = new AuthService();