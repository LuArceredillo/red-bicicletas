const nodemailer = require('nodemailer');

let mailConfig = {
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'ilene.huel@ethereal.email',
        pass: 'HhVryy58GRQHXQAPwk'
    }
};

module.exports = nodemailer.createTransport(mailConfig);