// express
const express = require('express')
// 自定义配置
const config = require('./config/config')
// 日志中间件
const morgan = require('morgan')
// cookie-session
const cookieSession = require('cookie-session')
// 导入跨域
const cors = require('cors')
const app = express()
// 允许第一次方法
app.set('trust proxy', 1)
// 设置加密的字符串
app.use(cookieSession({
  name: 'session',
  keys: ['bigevents']
}))
// 允许跨域
app.use(cors())
// 打印日志
app.use(morgan(':method :url :status'))
// 注册路由
app.use('/admin/user',require('./routers/userRouter'))

app.listen(config.port,()=>{
  console.log('success');
})



