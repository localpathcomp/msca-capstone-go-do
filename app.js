const express = require('express')
const session = require('express-session')
const path = require('path')
const app = express()
const { index } = require('./api/index')
const { sessionStore } = require('./api/middleware/session')
const { sessionProtect } = require('./api/middleware/sessionProtect')
const { sessionVerify } = require('./api/middleware/sessionVerify')
const { login } = require('./api/auth/login')
const { register } = require('./api/auth/register')
const { accountValidation } = require('./api/auth/accountValidation')
const listsController = require('./api/controller/listsController')
const itemsController = require('./api/controller/itemsController')

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

app.get('/api/session/protect', sessionProtect)

app.post('/login', sessionVerify, login)
app.post('/register', sessionVerify, register)
app.get('/validate-account/:registrationLink', accountValidation)

//@RESTful routes, require auth
app.use('/api/list', sessionVerify, listsController)

app.use('/api/item', sessionVerify, itemsController)
//@RESTful routes

app.get('/*', index)

app.listen(NODE_PORT || 8080, () => console.log(`Server listening on port ${NODE_PORT || 8080}`))