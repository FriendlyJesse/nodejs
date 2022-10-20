const joi = require('joi')

/**
 * string() 值必须时字符串
 * alphanum() 值只能时包含 a-zA-z0-9的字符串
 * min(length) 最小长度
 * max(length) 最大长度
 * required() 必填项
 * pattern(正则) 值必须符合正则表达式的规则
 */

// 用户名的验证规则
const username = joi
  .string()
  .alphanum()
  .min(1)
  .max(10)
  .required()
// 密码的验证规则
const password = joi
  .string()
  .pattern(/^[\S]{6,12}$/)
  .required()

const nickname = joi
.string()
.alphanum()
.required()

const email = joi.string().email()
const mobile = joi.string().length(11).pattern(/^[0-9]+$/).required()

exports.regLoginSchema = {
  body: {
    username,
    password
  }
}

exports.setUserInfo = {
  body: {
    nickname,
    email,
    mobile
  }
}

exports.resetPassword = {
  body: {
    oldPwd: password,
    // joi.ref('oldPwd') 与引用的值保持一致
    // joi.not(joi.ref('oldPwd')) 不能等于 oldPwd的值
    // concat 合并两条规则
    newPwd: joi.not(joi.ref('oldPwd')).concat(password)
  }
}

exports.setAvatar = {
  body: {
    avatar: joi.string().required()
  }
}