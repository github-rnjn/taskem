const { Resend } = require("resend");

const env = require("../config/env");

const resend = new Resend(env.RESEND_API_KEY);

module.exports = resend;