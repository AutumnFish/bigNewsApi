const articleModel = require('../models/article')
const fs = require('fs')
const path = require('path')
const config = require('../config/config')
module.exports = {
  search(req, res) {
    // 获取数据

    // 根据数据生成sql语句
    articleModel.search({
      ...req.query,
      callback(result) {
        res.send(result)
      }
    })
  }
}
