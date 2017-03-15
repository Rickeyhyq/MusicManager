'use strict'
const path = require('path')
const fs = require('fs')
const MongoClient = require('mongodb').MongoClient

// 导入数据库操作方法
const databaseManager = require(path.join(__dirname, '../tools/databaseManager.js'))

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
  const uname = req.body.uname
  const pwd = req.body.pwd

  databaseManager.findOne('account', {
    username: uname,
    password: pwd,
    status: 0
  }, (account) => {
    console.log(account)
    if (account !== null) {
      res.end('<script>window.location.href = "/musicmanager/musiclist"</script>')
    } else {
      res.end('<script>alert("用户名或密码错误,请重新登录"); window.location.href = "/account/login"</script>')
    }
  })

  // const url = 'mongodb://localhost:27017/musicmanager'
  // // 连接数据库
  // MongoClient.connect(url, (error, db) => {
  //   db.collection('account').findOne({
  //     username: req.body.uname,
  //     password: req.body.pwd,
  //     status: 0
  //   }, (error, docs) => {
  //     if (error) console.log(error)
  //     console.log(docs)
  //     if (docs !== null) {
  //       res.end('<script>window.location.href = "/list/musicManager"</script>')
  //     } else {
  //       res.end('<script>alert("用户名或密码错误,请重新登录"); window.location.href = "/account/login"</script>')
  //     }
  //   })
  // })
}