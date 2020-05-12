const validateFields = (req, res) => {        
    const objectArray = Object.entries(req.body)
    let errorArray = []
    objectArray.forEach(([key, value]) => {
        if (value === '' || value === undefined) {
            errorArray.push(key)
        }
    })
    if (errorArray.length >= 1) {
        res.status(400).send(`Please correct these fields! Empty: ${errorArray.join(' ')}`)
        return false
    }
    return true
}

module.exports = { validateFields }