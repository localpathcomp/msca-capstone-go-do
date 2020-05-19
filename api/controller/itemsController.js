const express = require('express')
const router = express.Router()
router.use(express.urlencoded({ extended: true }))
router.use(express.json())

const item = require('../model/item/item')
const { jwtVerify } = require('../middleware/jwtVerify')

router.get('/', jwtVerify, (req, res) => item.index(req, res, req.body))
router.post('/', jwtVerify, (req, res) => item.create(req, res, req.body))
router.get('/count/:listId', jwtVerify, (req, res) => item.count(req, res, req.body))


module.exports = router