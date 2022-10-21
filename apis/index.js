const { Router } = require('express')
const router = Router()

const routes = {
  '/users': require('./modules/users'),
  '/userinfo': require('./modules/userinfo'),
  '/articleCate': require('./modules/articleCate'),
  '/articles': require('./modules/articles'),
}

Object.keys(routes).forEach(key => {
  router.use(key, routes[key])
})

module.exports = router