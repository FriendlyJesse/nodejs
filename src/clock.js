const fs = require('fs')
const path = require('path')

// 匹配标签的正则
// \s 表示空白字符；\S表示非空白字符；* 表示匹配任意次数；()分组
const regStyle = /<style>(?<content>[\s\S]*)<\/style>/
const regScript = /<script>(?<content>[\s\S]*)<\/script>/

const file = path.join(__dirname, '..', 'index.html')


function makeDir (_path) { // 没有文件夹则创建文件夹
  if (!fs.existsSync(path.resolve(_path))) {
    fs.mkdirSync(_path)
  }
}

function resloveCSS (htmlStr) {
  const r1 = regStyle.exec(htmlStr)
  const newCSS = r1.groups.content
  
  fs.writeFile(path.join(__dirname, '..', './clock/index.css'), newCSS, err => {
    if (err) return console.log(`写入 CSS 样式失败！${err.message}`)
    console.log('写入 CSS 样式成功！')
  })
}

function resloveJS (htmlStr) {
  const r1 = regScript.exec(htmlStr)
  const newJS = r1.groups.content
  
  fs.writeFile(path.join(__dirname, '..', './clock/index.js'), newJS, err => {
    if (err) return console.log(`写入 JS 脚本失败！${err.message}`)
    console.log('写入 JS 脚本成功！')
  })
}

function resloveHTML (htmlStr) {
  const newHTML = htmlStr
    .replace(regStyle, '<link href="./index.css" rel="stylesheet"></link>')
    .replace(regScript, '<script src="./index.js"></script>')
  fs.writeFile(path.join(__dirname, '..', './clock/index.html'), newHTML, err => {
    if (err) return console.log(`写入 HTML 失败！${err.message}`)
    console.log('写入 HTML 成功！')
  })
}


fs.readFile(file, 'utf8', (err, result) => {
  if (err) return console.log(`文件读取失败！${err.message}`)
  
  makeDir('./clock')
  resloveCSS(result)
  resloveJS(result)
  resloveHTML(result)

})