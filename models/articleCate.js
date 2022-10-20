const db = require('../db')

exports.getCates = async (req, res) => {
  const sql = 'SELECT * FROM article_cate WHERE is_delete=0 ORDER BY id ASC'
  const [ rows ] = await db.promise().query(sql)
  res.msg('', 200, rows)
}

exports.addCate = async (req, res) => {
  const { name, alias } = req.body

  // 查重
  const selSql = 'SELECT * FROM article_cate WHERE name=? || alias=?'
  const [ rows ] = await db.promise().query(selSql, [name, alias])
  if (rows.length === 2) {
    return res.msg('分类名称与分类别名同时被占用', 400)
  } else if (rows.length === 1 && rows[0].name === name && rows[0].alias === alias) {
    return res.msg('分类名称与分类别名同时被占用', 400)
  } else if (rows.length === 1 && rows[0].name === name) {
    return res.msg('分类名称被占用', 400)
  } else if (rows.length === 1 && rows[0].alias === alias) {
    return res.msg('分类别名被占用', 400)
  }

  // 插入数据
  const sql = 'INSERT INTO article_cate SET ?'
  const [ result ] = await db.promise().query(sql, req.body)
  if (result.affectedRows !== 1) return res.msg('添加失败！', 400)
  res.msg('添加成功！')
}

exports.delCate = async (req, res) => {
  const { id } = req.body
  const sql = 'UPDATE article_cate SET is_delete=1 WHERE id=?'
  const [ result ] = await db.promise().query(sql, id)
  if (result.affectedRows !== 1) return res.msg('删除出错！', 400)
  res.msg('删除成功！')
}

exports.getCate = async (req, res) => {
  const { id } = req.params
  const sql = 'SELECT * FROM article_cate WHERE is_delete=0 && id=?'
  const [ rows ] = await db.promise().query(sql, id)
  if (rows.length !== 1) return res.msg('查询失败！', 400)
  res.msg('查询成功！', 200 , rows[0])
}

exports.setCate = async (req, res) => {
  const { id, name, alias } = req.body
  
  // 查重
  // id!=? 将当前id的数据项排除掉
  const selSql = 'SELECT * FROM article_cate WHERE id!=? && (name=? || alias=?)'
  const [ rows ] = await db.promise().query(selSql, [id, name, alias])
  if (rows.length === 2) {
    return res.msg('分类名称与分类别名同时被占用', 400)
  } else if (rows.length === 1 && rows[0].name === name && rows[0].alias === alias) {
    return res.msg('分类名称与分类别名同时被占用', 400)
  } else if (rows.length === 1 && rows[0].name === name) {
    return res.msg('分类名称被占用', 400)
  } else if (rows.length === 1 && rows[0].alias === alias) {
    return res.msg('分类别名被占用', 400)
  }
  // 更新数据
  const sql = 'UPDATE article_cate SET name=?,alias=? WHERE id=?'
  const [ result ] = await db.promise().query(sql, [name, alias, id])
  if (result.affectedRows !== 1) return res.msg('修改失败！', 400)
  res.msg('修改成功！')
}