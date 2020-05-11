const express = require('express')
const path = require('path')
const app = express()
const { login } = require('./api/auth/login')
const { register } = require('./api/auth/register')

app.use(express.static(path.join(__dirname, 'build')))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const PORT = process.env.NODE_PORT

app.post('/login', login)

app.post('/register', register)

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'build', 'index.html')))

app.listen(PORT || 8080, () => console.log(`Server listening on port ${PORT || 8080}`))