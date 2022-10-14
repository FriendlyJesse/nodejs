const { Router } = require('express')
const router = Router()

const routes = {
  '/users': require('./modules/users')
}

Object.keys(routes).forEach(key => {
  router.use(key, routes[key])
})

module.exports = router