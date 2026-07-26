const verificationTemplate = (name, otp) => {
    return `
        <div style="font-family:Arial,sans-serif">
            <h2>Hello ${name},</h2>

            <p>Your verification code is:</p>

            <h1>${otp}</h1>

            <p>This code expires in 10 minutes.</p>

            <p>If you didn't create this account, please ignore this email.</p>
        </div>
    `;
};

module.exports = verificationTemplate;