const resend = require("../emails/resend");
const env = require("../config/env");
const verificationTemplate = require("../emails/verification.template");
const resetPasswordTemplate = require("../emails/resetPassword.template");

class EmailService {
    async sendEmail({ to, subject, html }) {
        await resend.emails.send({
            from: env.EMAIL_FROM,
            to,
            subject,
            html,
        });
    }

    async sendVerificationEmail(user, otp) {
        return this.sendEmail({
            to: user.email,
            subject: "Verify your email",
            html: verificationTemplate(user.name, otp),
        });
    }

    async sendPasswordResetEmail(user, otp) {

        return this.sendEmail({

            to: user.email,

            subject: "Reset your password",

            html: resetPasswordTemplate(
                user.name,
                otp
            )

        });

    }
}

module.exports = new EmailService();