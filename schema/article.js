const joi = require('joi')

const name = joi.string().required()
const alias = joi.string().alphanum().required()
const id = joi.number().integer().min(1).required()

exports.addCate = {
  body: {
    name,
    alias
  }
}

exports.delCate = {
  body: {
    id
  }
}

exports.getCate = {
  params: {
    id
  }
}

exports.setCate = {
  body: {
    id,
    name,
    alias
  }
}



exports.getArticle = {
  params: {
    id
  }
}

exports.addArticle = {
  body: {
    title: joi.string().min(3).max(20).required(),
    content: joi.string().required(),
    cate_id: id,
    author_id: id
  }
}

exports.setArticle = {
  body: {
    id,
    title: joi.string().min(3).max(20).required(),
    content: joi.string().required(),
    cate_id: id,
    author_id: id
  }
}

exports.delArticle = {
  body: {
    id
  }
}