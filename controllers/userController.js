const userModel = require('../models/user')
module.exports = {
  // post
  login(req, res) {
    // res.send('/login')
    // 接收用户名和密码
    const { username, password } = req.body
    userModel.login({
      username,
      password,
      callback(result) {
        // console.log(result)
        let code, msg
        if (result) {
          code = 200
          msg = '登录成功'
  
        } else {
          code = 400
          msg = '用户名或密码错误'
        }
        res.sendMsg({
          code,
          msg
        })
      }
    })
  },
  // get
  logout(req, res) {
    res.sendMsg({
      code: 200,
      msg: '登出成功'
    })
  },
  //
  async userinfo_get(req, res) {
   userModel.userinfo_get({
     callback(result){
       res.sendMsg({
         code:200,
         msg:'获取成功',
         data:result[0]
       })
     }
   })
  },
  // post
  userinfo_edit(req, res) {
    res.send('userinfo_edit')
  }
}
