const bcrypt = require('bcryptjs')
const db = require('../db')

exports.getUserInfo = async (req, res) => {
  const { id } = req.auth
  const sql = 'SELECT id,username,nickname,avatar,mobile,email FROM users WHERE id=? AND is_delete=0'
  const [rows] = await db.promise().query(sql, id)
  if (rows.length !== 1) return res.msg('获取用户信息失败！', 400)
  res.msg('用户信息获取成功！', 200, rows[0])
}

exports.setUserInfo = async (req, res) => {
  const { id } = req.auth
  const { nickname, email, mobile } = req.body
  const sql = `UPDATE users SET nickname=?,email=?,mobile=? WHERE id=?`
  const [results] = await db.promise().query(sql, [nickname, email, mobile, id])
  if (results.affectedRows !== 1) return res.msg('用户信息设置失败！', 400)
  res.msg('用户信息设置成功！')
}

exports.resetPassword = async (req, res) => {
  const { id } = req.auth
  const { oldPwd, newPwd } = req.body
  
  // 查询用户
  const sql = 'SELECT password FROM users WHERE id=?'
  const [rows] = await db.promise().query(sql, id)
  if (rows.length !== 1) return res.msg('获取用户信息失败！', 400)
  const user = rows[0]
  // 对比用户旧密码
  const ok = bcrypt.compareSync(oldPwd, user.password)
  if (!ok) return res.msg('用户密码不正确！', 400)

  // 设置用户新密码
  const newPassword = bcrypt.hashSync(newPwd, 10)
  const updateSql = `UPDATE users SET password=? WHERE id=?`
  const [results] = await db.promise().query(updateSql, [newPassword, id])
  if (results.affectedRows !== 1) return res.msg('用户密码设置失败！', 400)
  res.msg('密码设置成功！')
}

exports.setAvatar = async (req, res) => {
  const { id } = req.auth
  const { avatar } = req.body
  const updateSql = `UPDATE users SET avatar=? WHERE id=?`
  const [results] = await db.promise().query(updateSql, [avatar, id])
  if (results.affectedRows !== 1) return res.msg('头像设置失败！', 400)
  res.msg('头像设置成功！')
}