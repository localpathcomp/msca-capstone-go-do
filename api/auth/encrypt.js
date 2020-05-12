const bcrypt = require('bcrypt')
const saltRounds = 10

const encrypt = (password, callback) => {
    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            console.log(err)
            return                
        }
        callback(hash)
    })
}

const compare = (password, hash, callback) => {
    bcrypt.compare(password, hash, (err, result) => {
        if (err) {
            console.log(err)
            return                
        }
        callback(result)
    })
}

module.exports = { encrypt, compare }