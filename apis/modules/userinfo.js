const { Router } = require('express')
const expressJoi = require('@escook/express-joi')

// models
const  usersModel = require('../../models/users')
const  userinfoModel = require('../../models/userinfo')
// schema
const { setUserInfo, resetPassword, setAvatar } = require('../../schema/user')

const router = Router()

router.get('/getUserInfo', userinfoModel.getUserInfo)
router.post('/setUserInfo', expressJoi(setUserInfo), userinfoModel.setUserInfo)
router.post('/resetPassword', expressJoi(resetPassword), userinfoModel.resetPassword)
router.post('/setUserAvatar', expressJoi(setAvatar), userinfoModel.setAvatar)


module.exports = router