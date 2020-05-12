const express = require('express')
const session = require('express-session')
const path = require('path')
const app = express()
const { sessionStore } = require('./api/middleware/session')
const { login } = require('./api/auth/login')
const { register } = require('./api/auth/register')

const PORT = process.env.PORT

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

app.get('/*', (req, res) => res.sendFile(path.join(__dirname, 'build', 'index.html')))

app.listen(PORT || 8080, () => console.log(`Server listening on port ${PORT || 8080}`))