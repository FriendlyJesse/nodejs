const { Router } = require('express')
const expressJoi = require('@escook/express-joi')

// models
const articleModel = require('../../models/article')

// schema
const { addCate } = require('../../schema/article')

const router = Router()

router.get('/getCates', articleModel.getCates)
router.post('/addCate', expressJoi(addCate),articleModel.addCate)

module.exports = router