const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

const transport = nodemailer.createTransport(sendgridTransport({
    auth: {
        api_key: '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'
    }
}))

transport.sendMail({
    to: 'toahr2t2@gmail.com',
    from: 'wtbwtb101@gmail.com',
    subject: 'Game invite',
    html: '<h1>test</h1>'
})
    .then(console.log('success'))
    .catch(err => console.log(err))