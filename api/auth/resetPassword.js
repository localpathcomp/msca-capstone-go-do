const EventEmitter = require('events')
const destroyResetLinkEmitter = new EventEmitter()
const { conn } = require('../dbh')
const { encrypt } = require('../middleware/encrypt')

const resetPassword = (req, res) => {


        const verificationLink = { verification_link: req.body.validationLink }
        conn.query("SELECT user_id FROM password_resets WHERE ? AND created_at >= DATE_SUB(NOW(), INTERVAL 48 HOUR) AND deleted_at IS NULL", verificationLink, (err, results, fields) => {
            if (err) {
                console.log(err)
                //http service unavailable
                res.status(503).send('There\'s been an error! Please try again or wait for the service to become available!')
                return
            } else if (results.length === 0) {
                //http no link found
                res.status(404).send('Your link has expired! Please submit a new password reset request!')
                return
            } else if (results) {
                encrypt(req.body.password, setNewPassword(req, res, results[0].user_id))
            }
        })

    const setNewPassword = (req, res, userId) => (passHash) => {
    
        conn.query("UPDATE users SET password = ? WHERE id = ?", [passHash, userId], (err, results, fields) => {
            if (err) {
                console.log(err)
                //http service unavailable
                res.status(503).send('There\'s been an error! Please try again or wait for the service to become available!')
                return
            } else if (results) {
                destroyResetLinkEmitter.emit('destroyResetLink', req, res, userId)
            }
        })
    }
}

const destroyResetLink = (req, res, userId) => {
    conn.query("UPDATE password_resets SET deleted_at = CURRENT_TIMESTAMP() WHERE user_id = ?", [userId], (err, results, fields) => {
        if (err) {
            console.log(err)
            //http service unavailable
            res.status(503).send('There\'s been an error! Please try again or wait for the service to become available!')
            return
        } else if (results) {
            res.status(200).redirect(`${process.env.REACT_HOST || null}/`)
        }
    })
}

destroyResetLinkEmitter.on('destroyResetLink', destroyResetLink)

module.exports = { resetPassword }