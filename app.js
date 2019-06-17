// express
const express = require('express')
// 自定义配置
const config = require('./config/config')
// 日志中间件
const morgan = require('morgan')

// 导入跨域
const cors = require('cors')
const app = express()

// 暴露静态资源
app.use(express.static('static'))

// 允许跨域
app.use(cors())
// 打印日志
app.use(morgan(':method :url :status'))
// 注册路由
app.use(
  '/admin/user',
  require('./routers/userRouter')
)
app.use(
  '/admin/article',
  require('./routers/articleRouter')
)

app.listen(config.port, () => {
  console.log('success')
})
