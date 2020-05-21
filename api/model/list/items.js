const { conn } = require('../../dbh')

const items = (req, res) => {    
    conn.query("SELECT * FROM items WHERE list_id = ? AND deleted_at IS NULL", [req.params.listId], (err, results, fields) => {
        if (err) {
            console.log(err)
            //http service unavailable
            return res.status(503).send('There\'s been an error! Please try again or wait for the service to become available!')
        } else if (results.length === 0) {
            //http no account found
            return res.status(404).send('That list doesn\'t seem to exist...')
        } else if (results) {                     
            return res.status(200).json({results: results})
        }
    })
}

module.exports = items