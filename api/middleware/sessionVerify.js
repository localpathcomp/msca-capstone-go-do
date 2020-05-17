const sessionVerify = (req, res, next) => {    
    if (req.session.csrfToken !== JSON.parse(req.headers['csrf-token']) ||
        req.session.csrfToken === '' ||
        req.session.csrfToken === undefined ||
        req.headers['csrf-token'] === undefined ||
        req.headers['csrf-token'] === '') {
        res.status(401).send('There\'s been an error! Please reload your browser or wait for the service to become available!')
    } else {
        next()
    }
}

module.exports = { sessionVerify }