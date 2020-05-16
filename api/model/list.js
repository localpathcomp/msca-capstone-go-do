const { conn } = require('../dbh')

const list = (req, res, action, data = {}) => {

    const listCreate = (req, res, {
        listId: guid,
        userId: user_id,
        listTitle: title,
        listDescription: description
        } = {}) => {
        const list = {guid: guid, user_id: user_id, title: title, description}
        conn.query("INSERT INTO lists ?", list, (err, results, fields) => {
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
                return results[0].id
            }
        })
    }

    switch (action) {
        case 'CREATE':
            return listCreate(req, res, data)
        default:
            break;
    }
}

module.exports = { list }