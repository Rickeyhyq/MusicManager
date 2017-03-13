'use strict'
const express = require('express')
const path = require('path')

// 创建路由
const musicManagerRouter = express.Router()

const musicManagerCtrl = require(path.join(__dirname, '../controller/musicManagerController.js'))

musicManagerRouter.get('/musicManager', musicManagerCtrl.getMusicList)

// musicManagerRouter.post('/login', musicManagerCtrl.login)

module.exports = musicManagerRouter