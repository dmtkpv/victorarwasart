const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SMTP_HOST,
    port: process.env.EMAIL_SMTP_PORT,
    secure: process.env.EMAIL_SMTP_SECURE,
    auth: {
        user: process.env.EMAIL_SMTP_USER,
        pass: process.env.EMAIL_SMTP_PASSWORD
    }
});


module.exports = function (router, { exceptions }) {

    router.post('/', (req, res) => {

        transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to: 'dmtkpv@gmail.com',
            subject: 'Message',
            text: 'I hope this message gets delivered!'
        }, (err, info) => {
            console.log(info.envelope);
            console.log(info.messageId);
            res.send(req.body);
        });

    });


};