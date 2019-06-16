const userModel = require('../models/user')
const fs = require('fs')
const path = require('path')
const config = require('../config/config')
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
      callback(result) {
        res.sendMsg({
          code: 200,
          msg: '获取成功',
          data: result[0]
        })
      }
    })
  },
  // post
  userinfo_edit(req, res) {
    // console.log(req.file);
    const { username, nickname, email, password } = req.body
    let user_pic 
    try {
      const { filename, size, mimetype } = req.file
      if (size > 1024 * 1024 * 2) {
        fs.unlinkSync(path.join(__dirname, '../static/uploads', filename))
        return res.sendMsg({
          code: 400,
          msg: '文件太大'
        })
      }
      if (mimetype.indexOf('image/') == -1) {
        fs.unlinkSync(path.join(__dirname, '../static/uploads', filename))
        return res.sendMsg({
          code: 400,
          msg: '文件类型不对'
        })
      }
      user_pic = `${config.baseURL}/uploads/${filename}`
    } catch (error) {
      return res.sendMsg({
        code:400,
        msg:'user_pic 传递错误请检查'
      })
    }
   
    // 获取用户信息
    userModel.userinfo_edit({
      username,
      nickname,
      email,
      user_pic,
      password,
      callback(result) {
        // console.log(result)
        if (result.affectedRows) {
          res.sendUpdate()
        }
      }
    })
  }
}
