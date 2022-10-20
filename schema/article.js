const joi = require('joi')

const name = joi.string().required()
const alias = joi.string().alphanum().required()

exports.addCate = {
  body: {
    name,
    alias
  }
}