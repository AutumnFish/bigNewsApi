const connection = require('./connection')

function execute({sql, params, callback}) {
  if(params){
    connection.execute(sql, params, (err, results) => {
      if (err) {
        throw new Error(err)
      }
      callback(results)
    })
  }else{
    connection.query(sql, (err, results) => {
      console.log(sql);
      if (err) {
        throw new Error(err)
      }
      callback(results)
    })
  }
}
module.exports = {
  search({ key, type, state, page, perpage ,callback}) {
    // 准备sql语句
    let keySql = ''
    if(key){
      keySql =`title like '%${key}%' or content like '%${key}%' and `
    }
    // 类型
    let typeSql = ''
    if(type){
      typeSql = `type='${type}' `
    }
    // 分页
    let pageSql = ''
    if(!page){
      page = 1
    }
    if(!perpage){
      perpage = 6
    }
    pageSql = `limit ${page},${perpage}`
    const  sql = `SELECT * from articles ${(keySql||typeSql)?'where':''} ${keySql} ${typeSql} ${pageSql}`
    execute({
      sql,
      callback
    })
  },
  userinfo_get({ callback }) {
    execute({sql:'SELECT * FROM `users` WHERE id=?', params:['1'], callback})
  },
  userinfo_edit({ username, nickname, email, user_pic, password, callback }) {
    execute({
      sql:'Update  `users` set `username` = ? , `nickname` = ?,`email`=?,`user_pic`=?,`password`=? where id = 1',
      params:[username, nickname, email, user_pic, password],
      callback
      
    })
  }
}
