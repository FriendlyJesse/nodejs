const db = require('../db')

exports.getCates = async (req, res) => {
  const sql = 'SELECT * FROM article_cate WHERE is_delete=0 ORDER BY id ASC'
  const [ rows ] = await db.promise().query(sql)
  res.msg('', 200, rows)
}

exports.addCate = async (req, res) => {
  const sql = 'INSERT INTO article_cate SET ?'
  const [ result ] = await db.promise().query(sql, req.body)
  if (result.affectedRows !== 1) return res.msg('添加失败！', 400)
  res.msg('添加成功！')
}