const { conn } = require('../dbh')

const resetPasswordValidation = (req, res) => {    
    
        const verificationLink = { verification_link: req.params.validationLink }
        conn.query("SELECT verification_link FROM password_resets WHERE ? AND created_at >= DATE_SUB(NOW(), INTERVAL 48 HOUR) AND deleted_at IS NULL", verificationLink, (err, results, fields) => {
            if (err) {
                console.log(err)
                //http service unavailable
                res.status(503).send('There\'s been an error! Please try again or wait for the service to become available!')
                return
            } else if (results.length === 0) {
                //http no link found
                res.status(404).send('Your link has expired! Please submit a new account verification!')
                return
            } else if (results) {
                res.status(200).redirect(`${(process.env.REACT_HOST) ? process.env.REACT_HOST : ''}/reset-password/${req.params.validationLink}`)
            }
        })
}

module.exports = { resetPasswordValidation }