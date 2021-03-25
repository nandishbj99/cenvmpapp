const nodemailer = require('nodemailer');
const config = require('./config.json');



async function sendEmail({ from, to, subject, text }) {
    const transporter = nodemailer.createTransport(config.smtpOptions);
    await transporter.sendMail({ from, to, subject, text });
}

module.exports = sendEmail;
