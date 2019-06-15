const mysql = require('mysql2')
const config = require('../config/config')

// create the connection to database
module.exports = mysql.createConnection({
  host: config.host,
  user: config.username,
  password: config.password,
  database: config.database
})
