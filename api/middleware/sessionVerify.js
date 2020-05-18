const sessionVerify = (req, res, next) => {    
    if (req.session.csrfToken !== req.headers['csrf-token'] ||
        req.session.csrfToken === '' ||
        req.session.csrfToken === undefined ||
        req.headers['csrf-token'] === undefined ||
        req.headers['csrf-token'] === '') {
        return res.status(401).send('There\'s been an error! Please reload your browser or wait for the service to become available!')
    } else {
        next()
    }
}

module.exports = { sessionVerify }