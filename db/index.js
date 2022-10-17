const mysql = require('mysql2')

const db = mysql.createPool({
  host: '192.168.0.141',
  port: '3307',
  user: 'root',
  password: process.env.DB_PASSWORD,
  database: 'big_matter'
})

module.exports = db