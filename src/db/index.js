const mysql = require('mysql2')

const db = mysql.createPool({
  host: 'localhost',
  port: '3307',
  user: 'root',
  password: '123456',
  database: 'test'
})

db.query('SELECT 1', (err, results) => {
  console.log(err, results)
})