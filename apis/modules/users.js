const { Router } = require('express')
const expressJoi = require('@escook/express-joi')
const  usersModel = require('../../models/users')
const { regLoginSchema } = require('../../schema/user')

const router = Router()

router.post('/register', expressJoi(regLoginSchema), usersModel.register)

router.post('/login', expressJoi(regLoginSchema), usersModel.login)
router.post('/add', (req, res) => {
  res.send('test')
})

module.exports = router