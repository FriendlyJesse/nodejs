const { Router } = require('express')
const router = Router()

const routes = {
  '/users': require('./modules/users'),
  '/userinfo': require('./modules/userinfo'),
  '/article': require('./modules/article'),
}

Object.keys(routes).forEach(key => {
  router.use(key, routes[key])
})

module.exports = router