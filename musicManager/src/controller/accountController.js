'use strict'
const path = require('path')
const fs = require('fs')
const MongoClient = require('mongodb').MongoClient

module.exports.getLoginPage = (req, res) => {
  console.log('LoginPage')
  fs.readFile(path.join(__dirname, '../views/login.html'), (error, content) => {
    if (error) console.log(error)
    res.setHeader('Content-Type', 'text/html;charset=utf-8')
    res.end(content)
  })
}

module.exports.login = (req, res) => {
  console.log(req.body)

  const url = 'mongodb://localhost:27017/musicmanager'
  // 连接数据库
  MongoClient.connect(url, (error, db) => {
    db.collection('account').findOne({
      username: req.body.uname,
      password: req.body.pwd,
      status: 0
    }, (error, doc) => {
      if (error) console.log(error)
      console.log(doc)
      if (doc !== null) {
        res.end('<script>window.location.href = "/list/musicManager"</script>')
      } else {
        res.end('<script>alert("用户名或密码错误,请重新登录"); window.location.href = "/account/login"</script>')
      }
    })
  })
}