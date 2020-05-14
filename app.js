const express = require('express')
const session = require('express-session')
const path = require('path')
const app = express()
const { sessionStore } = require('./api/middleware/session')
const { login } = require('./api/auth/login')
const { register } = require('./api/auth/register')
const { accountValidation } = require('./api/auth/accountValidation')
const { jwt } = require('./api/middleware/jwt')

const NODE_PORT = process.env.PORT

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

app.get('/api/session/retrieve', (req, res) => {
    res.status(200).json({ message: 'ok' })
})

app.post('/login', login)
app.post('/register', register)
app.get('/validate-account/:registrationLink', accountValidation)
app.post('/api/token', jwt)
app.get('/*', (req, res) => res.status(200).redirect('http://localhost:3000'))
//app.get('/*', (req, res) => res.sendFile(path.join(__dirname, 'build', 'index.html')))

app.listen(NODE_PORT || 8080, () => console.log(`Server listening on port ${NODE_PORT || 8080}`))