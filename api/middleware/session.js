const session = require('express-session')
const MySQLStore = require('express-mysql-session')(session)
const options = {
    host: process.env.DB_HOST,
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.SESSION_DB_NAME
}
const sessionStore = new MySQLStore(options)

module.exports = { sessionStore }