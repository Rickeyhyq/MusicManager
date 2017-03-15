'use strict'
const express = require('express')
const path = require('path')

// 创建路由
const musicManagerRouter = express.Router()

const musicManagerCtrl = require(path.join(__dirname, '../controller/musicManagerController.js'))

// 跳转到歌曲列表页面
musicManagerRouter.get('/musiclist', musicManagerCtrl.getMusicList)
// 跳转到添加歌曲页面
musicManagerRouter.get('/add', musicManagerCtrl.getAddPage)
// 添加歌曲
musicManagerRouter.post('/add', musicManagerCtrl.getAddMusic)

// musicManagerRouter.post('/login', musicManagerCtrl.login)

module.exports = musicManagerRouter