const registrationMail = (req, link) => {

    const sgMail = require('@sendgrid/mail')

    sgMail.setApiKey(process.env.SENDGRID_API_KEY)

    const msg = {
        to: req.body.email,
        from: 'services@localpathcomputing.com',
        subject: 'Verify your Go Do account',
        text: 'and easy to do anywhere, even with Node.js',
        html: `<strong>Please click the link below to validate your account!</strong><br><br>Link expires in 48-hours<br><br>Link: http://localhost:8080/validate-account/${link}`,
    }

    sgMail.send(msg)

}

module.exports = { registrationMail }