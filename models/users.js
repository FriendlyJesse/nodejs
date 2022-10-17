const db = require('../db')
const bcrypt = require('bcryptjs')

exports.register = async (req, res) => {
  const { username, password } = req.body
  // 查询用户名是否被占用
  const sql = 'SELECT * FROM users where username=?'
  const [rows] = await db.promise().query(sql, [username])
  if (rows.length > 0) {
    return res.msg('用户名被占用，请更换其他用户名！', 400)
  }

  // 密码加密
  const newPassword = bcrypt.hashSync(password, 10)

  // 创建新用户
  const createUserSql = 'INSERT INTO users set ?'
  const [results] = await db.promise().query(createUserSql, {username, password: newPassword})
  if (results.affectedRows !== 1) {
    return res.msg('注册用户失败，请稍后再试！', 400)
  }
  res.msg('注册成功！')
}

exports.login = (req, res) => {

}
