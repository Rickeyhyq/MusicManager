'use strict'
const path = require('path')
const fs = require('fs')
const MongoClient = require('mongodb').MongoClient
// 导入数据库操作方法
const databaseManager = require(path.join(__dirname, '../tools/databaseManager.js'))
// 导入MD5加密包
const md5 = require('md5')

module.exports = {
  // 请求登录页面
  getLoginPage: (req, res) => {
    console.log('LoginPage')
    fs.readFile(path.join(__dirname, '../views/login.html'), (error, content) => {
      if (error) console.log(error)
      res.setHeader('Content-Type', 'text/html;charset=utf-8')
      res.end(content)
    })
  },
  // 处理登录逻辑
  login: (req, res) => {
    console.log(req.body)
    const uname = req.body.uname
    // 对密码进行MD5加密，然后和数据库中的密码进行对比
    const pwd = md5(req.body.pwd)
    console.log(pwd)
    databaseManager.findOne('account', {
      username: uname,
      password: pwd,
      status: 0
    }, (account) => {
      console.log(account)
      if (account !== null) {
        req.session.loginedname = uname
        res.setHeader('Content-Type', 'text/html;charset=utf-8')
        res.end('<script>window.location.href = "/musicmanager/musiclist"</script>')
      } else {
        req.session.loginedname = null
        res.setHeader('Content-Type', 'text/html;charset=utf-8')
        res.end('<script>alert("用户名或密码错误,请重新登录"); window.location.href = "/account/login"</script>')
      }
    })
  },
  // 处理退出逻辑
  logout: (req, res) => {
    req.session.loginedname = null
    res.end("<script>window.location.href='/account/login'</script>")
  },
  // 请求注册页面
  getRegisterPage: (req, res) => {
    console.log('registerPage')
    fs.readFile(path.join(__dirname, '../views/register.html'), (error, content) => {
      if (error) console.log(error)
      res.setHeader('Content-Type', 'text/html;charset=utf-8')
      res.end(content)
    })
  },
  // 提交注册信息，保存到数据库
  register: (req, res) => {
    console.log(req.body)
    const uname = req.body.uname
    const pwd = req.body.pwd
    let resultObj = {
      status: 1,
      message: "注册成功"
    }
    databaseManager.insertOne('account', {
      username: uname,
      password: pwd,
      status: 0
    }, (result) => {
      if (result == null) {
        resultObj.status = 0
        resultObj.message = "注册失败"
      }
      res.setHeader('Content-Type','application/json;charset=utf-8')
      res.json(resultObj)
    })
  }
}