const sessionVerify = req => {    
    if (req.session.csrfToken !== JSON.parse(req.headers['csrf-token']) ||
        req.session.csrfToken === '' ||
        req.session.csrfToken === undefined ||
        req.headers['csrf-token'] === undefined ||
        req.headers['csrf-token'] === '') {
        return false
    } else {
        return true
    }
}

module.exports = { sessionVerify }