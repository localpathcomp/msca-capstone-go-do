const { conn } = require('../../dbh')

const index = (req, res) => {    
    conn.query("SELECT * FROM lists WHERE user_id = ? AND deleted_at IS NULL", [req.userId], (err, results, fields) => {
        if (err) {
            console.log(err)
            //http service unavailable
            return res.status(503).send('There\'s been an error! Please try again or wait for the service to become available!')
        } else if (results.length === 0) {
            //http no account found
            return res.status(404).send('You need to sign up for an account to use this API!')
        } else if (results) {                     
            return res.status(200).json({results: results})
        }
    })
}

module.exports = index