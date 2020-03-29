import nodemailer from 'nodemailer';
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_LOGIN,
        pass: process.env.EMAIL_PASS
    }
});

export default ({ email: recipient, owner, company, invitationLink }) => {
    const mailOptions = {
        from: 'itpoint@gmail.com',
        to: recipient,
        subject: 'It-Point Invitation',
        text: `${owner} has invited you to ${company}. Please visit ${invitationLink} and confirm`,
    };

    return transporter.sendMail(mailOptions);
};
