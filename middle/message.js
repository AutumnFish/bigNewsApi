module.exports = function(req, res, next) {
  res.sendMsg = ({code,msg,data=undefined})=>{
    res.send({
      code,
      msg,
      data:data?data:undefined
    })
  }
  next()
}
