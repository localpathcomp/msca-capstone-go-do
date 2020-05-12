const { conn } = require('../dbh')
const { compare } = require('./encrypt')

const login = (req, res) => {

    const handleResult = (result) => {
        if (result === true) {
            req.session.loggedin = true
            res.status(200).send(JSON.stringify({ response: 'user authenticated' }))
        } else if (result === false) {
            req.session.loggedin = false
            res.status(401).send(JSON.stringify({ response: 'access denied' }))
        }
    }
    const retrieveUser = (req) => {
        const user = { email: req.body.email }
        conn.query('SELECT username, email, password FROM users WHERE ?', user, (err, results, fields) => {
            if (err) {
                console.log(err)
                //http service unavailable
                res.status(503).send('There\'s been an error! Please try again or wait for the service to become available!')
                return
            } else if (!results) {
                //http no account found
                res.status(204).send('You need to sign up for an account before logging in!')
                return
            } else if (results) {            
                compare(req.body.password, results[0].password, handleResult)
            }
        })
    }
    retrieveUser(req)
}

module.exports = { login }