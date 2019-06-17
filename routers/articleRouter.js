// express
const express = require('express')
// 导入控制器
const articleController = require('../controllers/articleController')
// 导入验证模块
const { check, validationResult } = require('express-validator/check')
// 导入body-parser接收数据
const bodyParser = require('body-parser')
// 导入信息提示中间件
const message = require('../middle/message')
// 接收文件的中间件
const multer = require('multer')
const upload = multer({ dest: 'static/articles' })
// 定义状态的种类
const stateArr = ['草稿', '已发布']

// 创建路由对象
const router = express.Router()
// 注册post数据接收中间件
router.use(bodyParser.urlencoded({ extended: false }))
// 注册信息提示中间件
router.use(message)
//
router.get(
  '/search',
  [
    check('state')
      .not()
      .isEmpty()
      .custom(value => {
        if (!stateArr.includes(value)) {
          return Promise.reject('状态的取值只有,草稿,已发布')
        }else{
          return Promise.resolve()
        }
      })
  ],
  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      // 生成提示信息
      let errMsg = ''
      errors.array().forEach(v => {
        if (!errMsg.includes(v.param)) errMsg += `${v.param} ,`
      })
      return res.sendMsg({
        code: 422,
        msg: `${errMsg} 格式不对,请检查`
      })
    }
    next()
  },
  articleController.search
)

module.exports = router
