const { Router } = require('express')
const expressJoi = require('@escook/express-joi')

// models
const articleModel = require('../../models/articles')

// schema
const { addArticle, setArticle, delArticle, getArticle } = require('../../schema/article')

const router = Router()

router.get('/getArticles', articleModel.getArticles) // 文章列表
router.get('/getArticle/:id', expressJoi(getArticle),articleModel.getArticle) // 文章
router.post('/addArticle', expressJoi(addArticle), articleModel.addArticle)
router.post('/setArticle', expressJoi(setArticle), articleModel.setArticle)
router.post('/delArticle', expressJoi(delArticle), articleModel.delArticle)

module.exports = router