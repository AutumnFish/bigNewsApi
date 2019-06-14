module.exports = {
  // post
  login(req,res){
    res.send('/login')
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