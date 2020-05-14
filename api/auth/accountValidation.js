const EventEmitter = require('events')
const validateAccountEmitter = new EventEmitter()
const { conn } = require('../dbh')

const accountValidation = (req, res) => {
    const verifyLink = (callback) => {
        const verificationLink = { verification_link: req.params.registrationLink }
        conn.query("SELECT user_id, verification_link FROM pending_registrations WHERE ? AND created_at >= DATE_SUB(NOW(), INTERVAL 48 HOUR) AND deleted_at IS NULL", verificationLink, (err, results, fields) => {
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
                callback(req, res, results[0].user_id)
            }
        })
    }
    const validateAccount = (req, res, userId) => {
        conn.query("UPDATE users SET verified_at = NOW() WHERE id = ?", [userId], (err, results, fields) => {
            if (err) {
                console.log(err)
                //http service unavailable
                res.status(503).send('There\'s been an error! Please try again or wait for the service to become available!')
                return
            } else if (results) {
                validateAccountEmitter.emit('destroyValidationLink', req, res, userId)
            }
        })
    }
    verifyLink(validateAccount)
}

const destroyValidatedLink = (req, res, userId) => {
    conn.query("UPDATE pending_registrations SET deleted_at = NOW() WHERE user_id = ?", [userId], (err, results, fields) => {
        if (err) {
            console.log(err)
            //http service unavailable
            res.status(503).send('There\'s been an error! Please try again or wait for the service to become available!')
            return
        } else if (results) {
            res.status(200).redirect(`${process.env.REACT_HOST || null}/login`)
        }
    })
}

validateAccountEmitter.on('destroyValidationLink', destroyValidatedLink)
module.exports = { accountValidation }