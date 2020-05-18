const express = require('express')
const router = express.Router()
router.use(express.urlencoded({ extended: true }))
router.use(express.json())

const item = require('../model/item/item')
const { jwtVerify } = require('../middleware/jwtVerify')

router.post('/', jwtVerify, (req, res) => {    
    item.create(req, res, req.body)
})

module.exports = router