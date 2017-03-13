'use strict'
const express = require('express')
const path = require('path')

// 创建路由
const accountRouter = express.Router()

const accountCtrl = require(path.join(__dirname, '../controller/accountController'))

accountRouter.get('/login', accountCtrl.getLoginPage)

accountRouter.post('/login', accountCtrl.login)

module.exports = accountRouter