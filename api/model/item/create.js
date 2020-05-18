const { conn } = require('../../dbh')

const create = (req, res, {
    listId: list_id,
    itemId: guid,
    itemTitle: title,
    itemDescription: description
} = {}) => {
    console.log(req.body)
    const CURRENT_TIMESTAMP = { toSqlString: () => { return 'CURRENT_TIMESTAMP()'; }}
    const item = {guid: guid, list_id: list_id, title: title, description: description, created_at: CURRENT_TIMESTAMP}
    conn.query("INSERT INTO items SET ?", item, (err, results, fields) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                //http resource conflict
                return res.status(409).send('Seems like that list already exists...Maybe try reloading your browser...')
            }
            console.log(err)
            //http service unavailable
            return res.status(503).send('There\'s been an error! Please try again or wait for the service to become available!')
        } else if (results.length === 0) {
            //http no account found
            return res.status(404).send('You need to sign up for an account and verify your email before logging in!')
        } else if (results) {            
            return res.status(201).json({insertId: results.insertId})
        }
    })
}

module.exports = create