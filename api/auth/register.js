const crypto = require('crypto')
const { conn } = require('../dbh')
const { encrypt } = require('../middleware/encrypt')
const { validateFields } = require('../middleware/validateFields')
const { registrationMail } = require('../middleware/mail/registrationMail')

const register = (req, res) => {
    const verificationLink = crypto.randomBytes(36)

    const createUser = (req) => (passHash) => {
        const CURRENT_TIMESTAMP = { toSqlString: () => { return 'CURRENT_TIMESTAMP()'; }}
        conn.query("INSERT INTO users SET first_name = ?, email = ?, password = ?, created_at = ?", [req.body.firstName, req.body.email, passHash, CURRENT_TIMESTAMP], (err, results, fields) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    //http resource conflict
                    res.status(409).send('Seems like that user already exists...Maybe try resetting your password!')
                    return
                }
                console.log(err)
                //http service unavailable
                res.status(503).send('There\'s been an error! Please try again or wait for the service to become available!')
                return
            } else if (results.affectedRows !== 1) {
                //http not modified
                res.status(304).send('There\'s been an error! Please try again!')
                return
            } else if (results) {  
                const userVerify = { user_id: results.insertId, verification_link: verificationLink.toString('hex') }
                conn.query("INSERT INTO pending_registrations SET ?", userVerify, (err, results, fields) => {
                    if (err) {
                        console.log(err)
                        //http service unavailable
                        res.status(503).send('There\'s been an error! Please try again or wait for the service to become available!')
                        return                        
                    } else if (results) {               
                        registrationMail(req, verificationLink.toString('hex'))
                        //http resource created
                        res.status(201).send('User made!')
                    }
                })
            }
        })
    }
    
    if (validateFields(req, res)) encrypt(req.body.password, createUser(req))
}

module.exports = { register }