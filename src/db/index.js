const mysql = require('mysql2')

const db = mysql.createPool({
  host: '192.168.0.141',
  port: '3307',
  user: 'root',
  password: '123456',
  database: 'test'
})

// db.query('SELECT * FROM users', (err, results) => {
//   if (err) return console.log(err.message)
//   console.log(results)
// })

// const user = {
//   username: 'jesse3',
//   password: 'jesse123'
// }
// // 直接将 ？ 表示按顺序插入的占位符
// const sqlStr = 'INSERT INTO users SET ?'
// // 将数据对象当作占位符的值
// db.query(sqlStr, user, (err, results) => {
//   if (err) return console.log(err.message)
//   console.log(results)
// })

// const user = {
//   id: 13,
//   username: 'bbb',
//   password: '000'
// }
// const sqlStr = 'UPDATE users SET ? WHERE id=?'
// db.query(sqlStr, [user, user.id], (err, results) => {
//   if (err) return console.log(err.message)
//   if (results.affectedRows === 1) console.log('更新数据成功！')
// })

// const sqlStr = 'DELETE FROM users WHERE id=?'
// const field = 14
// db.query(sqlStr, field,(err, results) => {
//   if (err) return console.log(err.message)
//   if (results.affectedRows === 1) console.log('删除数据成功！')
// })