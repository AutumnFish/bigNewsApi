module.exports = {
  // post
  login(req,res){
    // res.send('/login')
    // 接收用户名和密码
    const {user_name,password} = req.body
  },
  // get
  logout(req,res){
    res.send('/logout')
  },
  // get
  userinfo_get(req,res){
    res.send('userinfo_get')
  },
  // post
  userinfo_edit(req,res){
    res.send("userinfo_edit")
  }
}