const express = require('express')
const router = express.Router()
router.use(express.urlencoded({ extended: true }))
router.use(express.json())

const list = require('../model/list/list')
const { jwtVerify } = require('../middleware/jwtVerify')

router.post('/', jwtVerify, (req, res) => {    

    list.create(req, res, req.body)

})

module.exports = router