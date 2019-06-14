const express = require('express')
const userController = require('../controllers/userController')
const router = express.Router()

// 注册路由
router.post('/login',userController.login)
router.get('/logout',userController.logout)
router.get('/info',userController.userinfo_get)
router.post('/info',userController.userinfo_edit)



module.exports = router