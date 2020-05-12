const { conn } = require('../dbh')
const { encrypt } = require('./encrypt')

const register = (req, res) => {

    const createUser = (req) => (passHash) => {
        
        const user = { username: req.body.username, email: req.body.email, password: passHash }
        conn.query("INSERT INTO users SET ?", user, (err, results, fields) => {
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
            } else {
                //http resource created
                res.status(201).send('User made!')
            }
        })
    }

    encrypt(req.body.password, createUser(req))
}

module.exports = { register }