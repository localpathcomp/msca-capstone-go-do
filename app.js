const express = require('express')
const session = require('express-session')
const path = require('path')
const app = express()
const MySQLStore = require('express-mysql-session')(session)
const options = {
    host: process.env.DB_HOST,
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.SESSION_DB_NAME
}
const sessionStore = new MySQLStore(options)
const PORT = process.env.NODE_PORT

const { login } = require('./api/auth/login')
const { register } = require('./api/auth/register')

app.use(express.static(path.join(__dirname, 'build')))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(session({
    key: process.env.SESSION_COOKIE_NAME,
    secret: process.env.SESSION_COOKIE_SECRET,
    store: sessionStore,
    resave: true,
    saveUninitialized: true
}))

app.post('/login', login)

app.post('/register', register)

app.get('/test', (req, res) => res.status(200).send('hello'))
app.get('/api/session/retrieve', (req, res) => {
    req.session.loggedin = true
    res.status(200).send(JSON.stringify({ response: 'works' }))
})
app.get('/api/session/check', (req, res) => {   
    res.send(JSON.stringify({response: req.session}))
})
app.get('/api/session/logout', (req, res) => {
    req.session.loggedin = false
    res.status(200).send(JSON.stringify({ response: 'logged out'}))
})

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'build', 'index.html')))

app.listen(PORT || 8080, () => console.log(`Server listening on port ${PORT || 8080}`))