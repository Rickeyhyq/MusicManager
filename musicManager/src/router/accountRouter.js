'use strict'
const express = require('express')
const path = require('path')

// 创建路由
const accountRouter = express.Router()

const accountCtrl = require(path.join(__dirname, '../controller/accountController.js'))

// 请求登录页面
accountRouter.get('/login', accountCtrl.getLoginPage)
// 处理登录逻辑
accountRouter.post('/login', accountCtrl.login)
// 处理退出逻辑
accountRouter.get('/logout', accountCtrl.logout)

// 导出账户管理对象
module.exports = accountRouter