const { conn } = require('../dbh')
const { compare } = require('./encrypt')

const login = (req, res) => {

    const retrieveUser = (req) => {
        const userPass = { email: req.body.email }
        conn.query('SELECT username, email, password FROM users WHERE ?', userPass, (err, results, fields) => {
            if (err) {
                console.log(err)
                //http service unavailable
                res.status(503).send('There\'s been an error! Please try again or wait for the service to become available!')
                return
            } else if (results) {
                res.status(200).send(results[0])
                console.log(results[0].password)
            }
        })
    }
    retrieveUser(req)
    /* conn.query("INSERT INTO users (username, email, password) VALUES ('garrick', 'g@g.com', 'password')", (err, results, fields) => {
        if (err.code === 'ER_DUP_ENTRY') {
            res.status(403).send('Forbidden action!')
            return
        } else if (results.affectedRows !== 1) {
            res.status(401).send('Not authorized!')
            return
        } else {
            res.status(201).send('User made!')
        }
    })

    compare(req.body.password, dbHash, passLogin(result)) */
}


module.exports = { login }