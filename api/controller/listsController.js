const express = require('express')
const router = express.Router()
router.use(express.urlencoded({ extended: true }))
router.use(express.json())

const list = require('../model/list/list')
const { jwtVerify } = require('../middleware/jwtVerify')

router.get('/:listId/items', jwtVerify, (req, res) => list.items(req, res))//@items, all list items
router.get('/', jwtVerify, (req, res) => list.index(req, res))//@index, all lists
router.post('/', jwtVerify, (req, res) => list.create(req, res, req.body))//@create, single list


module.exports = router