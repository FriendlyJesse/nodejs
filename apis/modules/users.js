const { Router } = require('express')
const router = Router()

const  usersModel = require('../../models/users')

router.post('/register', usersModel.register)

router.post('/login', usersModel.login)

module.exports = router