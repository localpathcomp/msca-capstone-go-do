const { conn } = require('../../dbh')

const count = (req, res) => {        
    conn.query("SELECT COUNT(*) as itemCount, list_id FROM items WHERE list_id = ? AND deleted_at IS NULL GROUP BY list_id ", [req.params.listId], (err, results, fields) => {
        if (err) {
            console.log(err)
            //http service unavailable
            return res.status(503).send('There\'s been an error! Please try again or wait for the service to become available!')
        } else if (results.length === 0) {
            //http no resource found
            return res.status(404).send('Those resources don\'t seem to exist...')
        } else if (results) {                     
            return res.status(200).json({results: results})
        }
    })
}

module.exports = count



