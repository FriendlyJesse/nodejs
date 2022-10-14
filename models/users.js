exports.register = (req, res) => {
  const { username, password } = req.body
  if (!username || !password) {
    res.status(400).send({ message: '用户名或密码不合法！' })
  }
  
  res.send({
    message: '登录成功！'
  })
}

exports.login = (req, res) => {

}
