const mysql = require('mysql2')

const db = mysql.createPool({
  host: '192.168.0.141',
  port: '3307',
  user: 'root',
  password: '123456',
  database: 'big_matter'
})

module.exports = db