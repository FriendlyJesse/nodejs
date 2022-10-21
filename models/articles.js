const db = require('../db')

exports.getArticles = async (req, res) => {
  const sql = 'SELECT *, UNIX_TIMESTAMP(create_time) as create_time, UNIX_TIMESTAMP(update_time) as update_time FROM articles WHERE is_delete=0 ORDER BY id ASC'
  const [ rows ] = await db.promise().query(sql)
  res.msg('获取成功！', 200, rows)
}

exports.getArticle = async (req, res) => {
  const { id } = req.params
  const sql = 'SELECT *, UNIX_TIMESTAMP(create_time) as create_time, UNIX_TIMESTAMP(update_time) as update_time FROM articles WHERE is_delete=0 && id=?'
  const [ rows ] = await db.promise().query(sql, id)
  if (rows.length !== 1) return res.msg('获取失败', 400)
  res.msg('获取成功！', 200, rows[0])
}

exports.addArticle = async (req, res) => {
  // 添加数据
  const sql = 'INSERT INTO articles SET ?'
  const [ result ] = await db.promise().query(sql, req.body)
  if (result.affectedRows !== 1) return res.msg('添加失败！', 400)
  res.msg('添加成功！')
}

exports.setArticle = async (req, res) => {
  console.log(req.body)
  const { id, title, content, cate_id, author_id } = req.body
  const sql = 'UPDATE articles SET title=?, content=?, cate_id=?, author_id=? WHERE id=?'
  const [ result ] = await db.promise().query(sql, [title, content, cate_id, author_id, id])
  if (result.affectedRows !== 1) return res.msg('修改失败！', 400)
  res.msg('修改成功！')
}

exports.delArticle = async (req, res) => {
  const { id } = req.body
  const sql = 'UPDATE articles SET is_delete=1 WHERE id=?'
  const [ result ] = await db.promise().query(sql, id)
  if (result.affectedRows !== 1) return res.msg('删除出错！', 400)
  res.msg('删除成功！')
}