const { conn } = require('../dbh')

const item = (req, res, action, data = {}) => {

    const itemCreate = (req, res, {
        listId: list_id,
        itemId: guid,
        itemTitle: title,
        itemDescription: description
        } = {}) => {
        const item = {list_id: list_id, guid: guid, title: title, description: description}
        conn.query("INSERT INTO items ?", item, (err, results, fields) => {
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
                res.status(201).send('resource created')
            }
        })
    }

    switch (action) {
        case 'CREATE':
            return itemCreate(req, res, data)
        default:
            break;
    }
}

module.exports = { item }