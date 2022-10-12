// const express = require('express')
// const formidable = require('express-formidable')

// const app = express()
// const router = require('./src/router/index')


// function nw (req, res, next) {
// 	console.log('这是一个简单的中间件')
// 	next()
// }

// // app.use(formidable())
// app.use(express.json())
// app.use(express.urlencoded({ extended: true }))
// app.use(express.static('./static'))
// app.use('/api', router) 
// app.use(nw)

// app.get('/test', (req, res) => {
//   console.log(req.query)
//   res.send({
//     name: 'test',
//     age: 20,
//     gender: '男'
//   })
// })
// app.post('/test', (req, res) => {
//   console.log(req)
//   res.send({
//     name: 'test',
//     age: 20,
//     gender: '女'
//   })
// })

// app.listen(8080, () => {
//   console.log('server running at http://localhost:8080')
// })

require('./src/db')