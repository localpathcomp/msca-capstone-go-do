const crypto = require('crypto')

const sessionProtect = (req, res) => {
    const csrfToken = crypto.randomBytes(48).toString('hex')
    req.session.csrfToken = csrfToken
    res.status(200).json({csrfToken: csrfToken})
}

module.exports = { sessionProtect }