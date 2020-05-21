const forgotPasswordMail = (req, link) => {

    const sgMail = require('@sendgrid/mail')

    sgMail.setApiKey(process.env.SENDGRID_API_KEY)

    const msg = {
        to: req.body.email,
        from: 'services@localpathcomputing.com',
        subject: 'Reset your Go Do account password',
        text: `Please click the link below to reset your password! Link expires in 48-hours<br><br>Link: ${process.env.NODE_HOST || process.env.PROD_HOST}/reset-password/${link}`,
        html: `<strong>Please click the link below to reset your password!</strong><br><br>Link expires in 48-hours<br><br>Link: ${process.env.NODE_HOST || process.env.PROD_HOST}/reset-password-verify/${link}`,
    }

    sgMail.send(msg)

}

module.exports = { forgotPasswordMail }