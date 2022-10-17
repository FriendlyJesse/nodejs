const db = require('../db')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

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

exports.login = async (req, res) => {
  const { username, password } = req.body

  // 根据用户名查询用户的信息
  const sql = 'SELECT * FROM users WHERE username=?'
  const [rows] = await db.promise().query(sql, [username])
  if (rows.length !== 1) {
    return res.msg('登录失败，没有这个用户！', 400)
  }
  const userinfo = rows[0]
  // 验证密码
  const compareResult = bcrypt.compareSync(password, userinfo.password)
  if (!compareResult) return res.msg('登录失败，密码错误！', 400)
  // 生成 Token
  const token = jwt.sign({ username, id: userinfo.id }, process.env.SECRET_KEY,{ expiresIn: '10h' })
  res.msg('登录成功！', 200, { token })
}
