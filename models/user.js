const connection = require('./connection')

function execute(sql, params, callback) {
  connection.execute(sql, params, (err, results) => {
    if (err) {
      throw new Error(err)
    }
    callback(results)
  })
}
module.exports = {
  login({ username, password, callback }) {
    execute(
      'SELECT * FROM `users` WHERE `username` = ? AND `password` = ?',
      [username, password],
      callback
    )
  },
  userinfo_get({ callback }) {
    execute(
      'SELECT * FROM `users` WHERE `username` = ? AND `password` = ?',
      ['admin', '123456'],
      callback
    )
  },
  userinfo_edit({ username, nickname, email, user_pic, password, callback }) {
    execute(
      'Update  `users` set `username` = ? , `nickname` = ?,`email`=?,`user_pic`=?,`password`=? where id = 1',
      [username, nickname, email, user_pic, password],
      callback
    )
  }
}
