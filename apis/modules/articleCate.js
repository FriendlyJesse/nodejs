const { Router } = require('express')
const expressJoi = require('@escook/express-joi')

// models
const articleModel = require('../../models/articleCate')

// schema
const { addCate, delCate, getCate, setCate } = require('../../schema/article')

const router = Router()

router.get('/getCates', articleModel.getCates)
router.post('/addCate', expressJoi(addCate), articleModel.addCate)
router.post('/delCate', expressJoi(delCate), articleModel.delCate)
router.get('/getCate/:id', expressJoi(getCate), articleModel.getCate)
router.post('/setCate', expressJoi(setCate), articleModel.setCate)

module.exports = router