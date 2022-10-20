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