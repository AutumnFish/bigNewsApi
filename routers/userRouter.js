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
// 接收文件的中间件
const multer = require('multer')
const upload = multer({ dest: 'static/uploads' })
// 创建路由对象
const router = express.Router()
// 注册post数据接收中间件
router.use(bodyParser.urlencoded({ extended: false }))
// 注册信息提示中间件
router.use(message)
// 路由 - 用户登录
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
        code: 422,
        msg: '用户名或密码格式不对，请检查'
      })
    }
    next()
  },
  userController.login
)

// 路由 - 用户登出
router.get('/logout', userController.logout)
router.get('/info', userController.userinfo_get)
router.post(
  '/info',
  upload.single('user_pic'),
  [
    // username must be an email
    check('username')
      .isString()
      .isLength({ min: 4 }),
    // password must be at least 5 chars long
    check('nickname').isString().not().isEmpty(),
    check('email').isEmail(),
    check('password').isLength({ min: 6 }),
  ],
  (req, res, next) => {
    const errors = validationResult(req)
    // console.log(errors.array());
    if (!errors.isEmpty()) {
      // 生成提示信息
      let errMsg = ''
      errors.array().forEach(v=>{
        errMsg+=`${v.param} ,`
      })

      return res.sendMsg({
        code: 422,
        msg: `${errMsg} 格式不对，请检查`,
      })
    }
    // console.log(req.file);
    // console.log(req.body);
    next()
  },
  userController.userinfo_edit
)

module.exports = router
