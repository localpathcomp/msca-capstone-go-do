const path = require('path')

const index = (req, res) => {
    if (process.env.NODE_ENV === 'development') {
        res.status(200).redirect('http://localhost:3000')
    } else {
        res.sendFile(path.join(__dirname + '/../../build', 'index.html'))
    }
}

module.exports = { index }