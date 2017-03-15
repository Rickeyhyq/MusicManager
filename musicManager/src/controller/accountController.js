'use strict'
const path = require('path')
const fs = require('fs')
const MongoClient = require('mongodb').MongoClient

// 导入数据库操作方法
const databaseManager = require(path.join(__dirname, '../tools/databaseManager.js'))

module.exports = {
  // 请求登录页面
  getLoginPage: (req, res) => {
    console.log('LoginPage')
    fs.readFile(path.join(__dirname, '../views/login.html'), (error, content) => {
      if (error) console.log(error)
      // res.setHeader('Content-Type', 'text/html;charset=utf-8')
      res.end(content)
    })
  },
  // 处理登录逻辑
  login: (req, res) => {
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
        req.session.loginedname = uname
        res.end('<script>window.location.href = "/musicmanager/musiclist"</script>')
      } else {
        req.session.loginedname = null
        res.end('<script>alert("用户名或密码错误,请重新登录"); window.location.href = "/account/login"</script>')
      }
    })
  }
}