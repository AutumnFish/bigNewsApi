module.exports = function(req, res, next) {
  res.sendMsg = ({ code, msg, data = undefined }) => {
    res.send({
      code,
      msg,
      data: data ? data : undefined
    })
  }
  res.sendUpdate = () => {
    res.send({
      code:202,
      msg:'更新成功'
    })
  }
  next()
}
