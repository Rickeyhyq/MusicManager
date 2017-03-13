'use strict'
const express = require('express')
const path = require('path')

// 创建路由
const studentManagerRouter = express.Router()

const studentManagerCtrl = require(path.join(__dirname, '../controller/studentManagerController'))

studentManagerRouter.get('/login', studentManagerCtrl.getStudentList)

// studentManagerRouter.post('/login', studentManagerCtrl.login)

module.exports = studentManagerRouter