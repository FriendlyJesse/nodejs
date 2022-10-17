const createError = require('http-errors')
const express = require('express')
const fs = require('fs')
const path = require('path')
const logger = require('morgan')
const joi = require('joi')

const app = express()

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
    res.msg = (err, status = 200) => {
      res.status(status).send({
        message: err instanceof Error ? err.message : err
      })
    }
    next()
  })


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
  // console.log(111111111)
  // console.log(err)
  // 数据验证失败
  if (err instanceof joi.ValidationError) return res.msg(err, 400)

  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
