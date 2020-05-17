const jwt = require('jsonwebtoken')
const EventEmitter = require('events')
const loginEmitter = new EventEmitter()
const { conn } = require('../dbh')
const { compare } = require('../middleware/encrypt')
const { validateFields } = require('../middleware/validateFields')

const login = (req, res) => {   

    const handleResult = (result) => {
        if (result === true) {
            const token = jwt.sign({
                userId: req.session.userId,
                userEmail: req.session.userEmail,
                userName: req.session.userName
            }, process.env.JWT_SECRET, {
                expiresIn: 86400
            })
            loginEmitter.emit('userAuthorized', req, res, token)
        } else if (result === false) {           
            req.session.destroy()
            res.status(401).send('Password incorrect. Please try again or reset your password.')
        }
    }
    const retrieveUser = (req) => {
        const user = { email: req.body.email }
        conn.query('SELECT id, first_name, email, password FROM users WHERE ? AND verified_at IS NOT NULL', user, (err, results, fields) => {
            if (err) {
                console.log(err)
                //http service unavailable
                res.status(503).send('There\'s been an error! Please try again or wait for the service to become available!')
                return
            } else if (results.length === 0) {
                //http no account found
                res.status(404).send('You need to sign up for an account and verify your email before logging in!')
                return
            } else if (results) {     
                req.session.userId = results[0].id
                req.session.userEmail = results[0].email
                req.session.userName = results[0].first_name               
                compare(req.body.password, results[0].password, handleResult)
            }
        })
    }
    if (validateFields(req, res)) retrieveUser(req)
}

const userAuthorized = (req, res, token) => {
    res.status(200).json({ auth: true, token: token})
}

loginEmitter.on('userAuthorized', userAuthorized)
module.exports = { login }