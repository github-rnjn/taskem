const resend = require("../emails/resend");
const env = require("../config/env");

class EmailService {
    async sendEmail({ to, subject, html }) {
        await resend.emails.send({
            from: env.EMAIL_FROM,
            to,
            subject,
            html,
        });
    }
}

module.exports = new EmailService();