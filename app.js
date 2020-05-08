const express = require('express')
const path = require('path')
const app = express()
const { login } = require('./api/auth/login')
const { register } = require('./api/auth/register')

app.use(express.static(path.join(__dirname, 'build')))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.post('/login', login)

app.post('/register', register)

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'build', 'index.html')))

app.listen(process.env.PORT || 8080, () => console.log(`Server listening on port ${process.env.PORT || 8080}`))