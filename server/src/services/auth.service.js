const ApiError = require("../utils/ApiError");

const authRepository = require("../repositories/auth.repository");
const verificationTokenRepository = require("../repositories/verificationToken.repository");

const emailService = require("./email.service");

const { HTTP_STATUS } = require("../constants");
const TOKEN_TYPES = require("../constants/tokenTypes");

const { generateNumericOTP, hashToken } = require("../utils/token");

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

        // Remove any previous verification token
        await verificationTokenRepository.deleteByUser(
            user._id,
            TOKEN_TYPES.EMAIL_VERIFICATION
        );

        const otp = generateNumericOTP();

        await verificationTokenRepository.create({
            user: user._id,
            tokenHash: hashToken(otp),
            type: TOKEN_TYPES.EMAIL_VERIFICATION,
            expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
        });

        await emailService.sendVerificationEmail(user, otp);

        return user;
    }

    async verifyEmail(email, otp) {
        const user = await authRepository.findByEmail(email);

        if (!user) {
            throw new ApiError(
                HTTP_STATUS.NOT_FOUND,
                "User not found"
            );
        }

        if (user.isVerified) {
            throw new ApiError(
                HTTP_STATUS.CONFLICT,
                "Email already verified"
            );
        }

        const verificationToken =
            await verificationTokenRepository.findByUser(
                user._id,
                TOKEN_TYPES.EMAIL_VERIFICATION
            );

        if (!verificationToken) {
            throw new ApiError(
                HTTP_STATUS.BAD_REQUEST,
                "Verification code expired. Please request a new one."
            );
        }

        const hashedOTP = hashToken(otp);

        if (hashedOTP !== verificationToken.tokenHash) {
            throw new ApiError(
                HTTP_STATUS.BAD_REQUEST,
                "Invalid verification code"
            );
        }

        const verifiedUser = await authRepository.verifyUser(user._id);

        await verificationTokenRepository.deleteByUser(
            user._id,
            TOKEN_TYPES.EMAIL_VERIFICATION
        );

        return verifiedUser;
    }

    async resendVerification(email) {

        const user = await authRepository.findByEmail(email);

        if (!user) {
            throw new ApiError(
                HTTP_STATUS.NOT_FOUND,
                "User not found"
            );
        }

        if (user.isVerified) {
            throw new ApiError(
                HTTP_STATUS.CONFLICT,
                "Email already verified"
            );
        }

        // Check if a verification token already exists
        const existingToken =
            await verificationTokenRepository.findByUser(
                user._id,
                TOKEN_TYPES.EMAIL_VERIFICATION
            );

        // Prevent resending within 30 seconds
        if (
            existingToken &&
            Date.now() - existingToken.createdAt.getTime() < 30 * 1000
        ) {
            throw new ApiError(
                HTTP_STATUS.TOO_MANY_REQUESTS,
                "Please wait 30 seconds before requesting another verification code."
            );
        }

        // Remove old token
        await verificationTokenRepository.deleteByUser(
            user._id,
            TOKEN_TYPES.EMAIL_VERIFICATION
        );

        const otp = generateNumericOTP();

        await verificationTokenRepository.create({
            user: user._id,
            tokenHash: hashToken(otp),
            type: TOKEN_TYPES.EMAIL_VERIFICATION,
            expiresAt: new Date(Date.now() + 10 * 60 * 1000)
        });

        await emailService.sendVerificationEmail(user, otp);
    }
}

module.exports = new AuthService();