const express = require('express')

const app = express()


app.listen(8080, () => {
  console.log('api server running at http://172.27.127.255:8080')
})