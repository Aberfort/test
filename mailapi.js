const nodemailer = require('nodemailer');
const {
    sending_email,
    email_pass,
    mail_to
} = require('./consts');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: sending_email, // generated ethereal user
        pass: email_pass  // generated ethereal password
    }
});

function createMail(body) {
    const {
        firstName,
        lastName,
        email,
        phone,
        company,
        size
    } = body;

    return {
        from: 'Landing form completed data',
        to: mail_to,
        subject: 'Registered for webinar',
        html: `
            <ul>
                <li>Full name: ${firstName} ${lastName}</li>
                <li>Email: ${email}</li>
                <li>Phone: ${phone}</li>
                <li>Company: ${company}</li>
                <li>Employees: ${size}</li>
            </ul>`
    }
}

module.exports = function(body){

    const mailOptions = createMail(body);
    transporter.sendMail(mailOptions, (err, info) => {
        if(err) {
            return console.log(err);
        }
        console.log('Message sent', info.messageId);
    })

};