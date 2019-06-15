// express
const express = require('express')
// 导入控制器
const userController = require('../controllers/userController')
// 导入验证模块
const { check, validationResult } = require('express-validator/check')
// 导入body-parser接收数据
const bodyParser = require('body-parser')
// 导入信息提示中间件
const message = require('../middle/message')
// 创建路由对象
const router = express.Router()
// 注册post数据接收中间件
router.use(bodyParser.urlencoded({ extended: false }))
// 注册信息提示中间件
router.use(message)
// 注册路由
router.post(
  '/login',
  [
    // username must be an email
    check('username')
      .isString()
      .isLength({ min: 4 }),
    // password must be at least 5 chars long
    check('password').isLength({ min: 6 })
  ],
  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.send({
        code:422,
        msg:'用户名或密码格式不对，请检查'
      })
    }
    next()
  },
  userController.login
)
router.get('/logout', userController.logout)
router.get('/info', userController.userinfo_get)
router.post('/info', userController.userinfo_edit)

module.exports = router
