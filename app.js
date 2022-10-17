const createError = require('http-errors')
const fs = require('fs')
const path = require('path')
const express = require('express')
const logger = require('morgan')
const joi = require('joi')
const dotenv = require('dotenv')
const { expressjwt } = require('express-jwt')

const app = express()

// env
dotenv.config()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

// middle ware
// 日志
const accessLogStream = fs.createWriteStream(path.join(__dirname, '/logs', 'access.log'), { flags: 'a' })
app
  .use(logger('dev', { stream: accessLogStream }))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use(express.static(path.join(__dirname, 'public')))
  .use((req, res, next) => { // 信息反馈
    res.msg = (err, status = 200, result) => {
      res.status(status).send({
        message: err instanceof Error ? err.message : err,
        result
      })
    }
    next()
  })
  .use(expressjwt({ secret: process.env.SECRET_KEY, algorithms: ['HS256'] }).unless({ path: ['/api/users/login', '/api/users/register'] }))


// routes
app
  .use('/', require('./routes/index'))
  .use('/api', require('./apis'))
  .use('/users', require('./routes/users'))

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  // 数据验证失败
  if (err instanceof joi.ValidationError) return res.msg(err, 400)
  // 身份证认证失败后的错误
  if (err.name === 'UnauthorizedError') return res.msg(err, err.status)

  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
