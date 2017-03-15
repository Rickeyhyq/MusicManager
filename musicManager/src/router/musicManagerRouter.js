'use strict'
const express = require('express')
const path = require('path')

// 创建路由
const musicManagerRouter = express.Router()
// 导入歌曲管理控制器
const musicManagerCtrl = require(path.join(__dirname, '../controller/musicManagerController.js'))

// 跳转到歌曲列表页面
musicManagerRouter.get('/musiclist', musicManagerCtrl.getMusicList)
// 跳转到添加歌曲页面
musicManagerRouter.get('/add', musicManagerCtrl.getAddPage)
// 添加歌曲
musicManagerRouter.post('/add', musicManagerCtrl.getAddMusic)
// 编辑歌曲信息
musicManagerRouter.get('/edit/:musicId', musicManagerCtrl.getEditPage)
// 提交编辑后的信息 
musicManagerRouter.post('/edit/:musicId', musicManagerCtrl.getEditMusic)
// 删除歌曲
musicManagerRouter.get('/delete/:musicId', musicManagerCtrl.getDeletePage)


// 导出歌曲管理对象
module.exports = musicManagerRouter