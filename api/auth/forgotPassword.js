const crypto = require('crypto')
const { conn } = require('../dbh')
const { validateFields } = require('../middleware/validateFields')
const { forgotPasswordMail } = require('../middleware/mail/forgotPasswordMail')

const forgotPassword = (req, res) => {
    const verificationLink = crypto.randomBytes(36)

    const checkUser = (req) => {
        conn.query("SELECT id, email FROM users WHERE email = ?", [req.body.email], (err, results, fields) => {
            if (err) {
                console.log(err)
                //http service unavailable
                res.status(503).send('There\'s been an error! Please try again or wait for the service to become available!')
                return
            } else if (results.length === 0) {
                //http not modified
                res.status(404).send('There\'s been an error! Please try again!')
                return
            } else if (results) {
                const CURRENT_TIMESTAMP = { toSqlString: () => { return 'CURRENT_TIMESTAMP()'; }}
                const userVerify = { user_id: results[0].id, verification_link: verificationLink.toString('hex'), created_at: CURRENT_TIMESTAMP }
                conn.query("INSERT INTO password_resets SET ?", userVerify, (err, results, fields) => {
                    if (err) {
                        console.log(err)
                        //http service unavailable
                        res.status(503).send('There\'s been an error! Please try again or wait for the service to become available!')
                        return                        
                    } else if (results) {               
                        forgotPasswordMail(req, verificationLink.toString('hex'))
                        //http resource created
                        res.status(201).send('Reset email sent!')
                    }
                })
            }
        })
    }
    
    if (validateFields(req, res))
        (checkUser(req))
}

module.exports = { forgotPassword }