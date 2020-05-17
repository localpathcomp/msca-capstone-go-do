const express = require('express')
const router = express.Router()
router.use(express.urlencoded({ extended: true }))
router.use(express.json())

const { list } = require('../model/list')
const { item } = require('../model/item')
const { sessionVerify } = require('../middleware/sessionVerify')
const { jwtVerify } = require('../middleware/jwtVerify')

router.post('/', jwtVerify, (req, res) => {

    console.log(req.body, req.headers);
    res.status(200).send('ok')
})


module.exports = router