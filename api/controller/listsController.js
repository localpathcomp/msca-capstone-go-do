const { list } = require('../model/list')
const { item } = require('../model/item')
const { sessionVerify } = require('../middleware/sessionVerify')

const listsController = (req, res) => {

    if (!sessionVerify(req)) {
        res.status(401).send('csrf error')
        return
    } else {
        console.log(req.headers['csrf-token'], req.body);
        res.status(200).send('ok')
    }
}

module.exports = { listsController}