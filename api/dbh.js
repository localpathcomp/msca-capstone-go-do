const conn = require('mysql').createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

conn.connect((err) => {
    if (err) {
      console.error('error connecting: ' + err.stack)
      return
    }
})
 
module.exports = { conn }