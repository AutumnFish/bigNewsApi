// express
const express = require('express')
// 自定义配置
const config = require('./config/config')
// 日志中间件
const morgan = require('morgan')
const app = express()
// 打印日志
app.use(morgan(':method :url :status'))
// 注册路由
app.use('/admin/user',require('./routers/userRouter'))

app.listen(config.port,()=>{
  console.log('success');
})



