'use strict'
const path = require('path')
const MongoClient = require('mongodb').MongoClient
const xtpl = require('xtpl')

// 导入数据库操作方法
const databaseManager = require(path.join(__dirname, '../tools/databaseManager.js'))

module.exports = {
  // 跳转到歌曲列表页面
  getMusicList: (req, res) => {
    // 获取查询字符串
    const keyword = req.query.keyword || ''
    databaseManager.findList('musics', { name: {$regex: keyword} }, (docs) => {
      console.log(docs)
      xtpl.renderFile(path.join(__dirname, '../views/musiclist.html'), {
        musics: docs,
        keyword: keyword,
        loginedname: req.session.loginedname
      }, (error, content) => {
        if (error) console.log(error)
        res.setHeader('Content-Type', 'text/html;charset=utf-8')
        res.end(content)
      })
    })
  },
  // 跳转到添加歌曲页面
  getAddPage: (req, res) => {
    console.log('addPage')
    xtpl.renderFile(path.join(__dirname, '../views/add.html'), {
      loginedname: req.session.loginedname
    }, (error, content) => {
      if (error) console.log(error)
      res.setHeader('Content-Type', 'text/html;charset=utf-8')
      res.end(content)
    })
  },
  // 提交新增歌曲信息
  getAddMusic: (req, res) => {
    const options = {
      name: req.body.name,
      age: req.body.age,
      sex: req.body.sex,
      phone: req.body.phone,
      address: req.body.address,
      introduction: req.body.introduction
    }
    databaseManager.insertOne('musics', options, (result) => {
      if (result !== null) {
        res.end('<script>window.location.href = "/musicmanager/musiclist"</script>')
      } else {
        res.end('<script>alert("添加失败")</script>')
      }
    })
  },
  // 跳转到编辑页面
  getEditPage: (req, res) => {
    const id = req.params.musicId
    const objectId = databaseManager.ObjectId(id)

    databaseManager.findOne('musics', {
      _id: objectId
    }, (result) => {
      xtpl.renderFile(path.join(__dirname, '../views/edit.html'), {
        music: result,
        loginedname: req.session.loginedname
      }, (error, content) => {
        if (error) console.log(error)
        res.setHeader('Content-Type', 'text/html;charset=utf-8')
        res.end(content)
      })
    })
  },
  // 提交编辑歌曲信息
  getEditMusic: (req, res) => {
    const id = req.params.musicId
    const objectId = databaseManager.ObjectId(id)
    const updateDoc = {
      name: req.body.name,
      age: req.body.age,
      sex: req.body.sex,
      phone: req.body.phone,
      address: req.body.address,
      introduction: req.body.introduction
    }
    databaseManager.updateOne('musics', {
      _id: objectId
    }, updateDoc, (result) => {
      if (result !== null) {
        res.end('<script>window.location.href = "/musicmanager/musiclist"</script>')
      } else {
        res.end('<script>alert("修改歌曲信息失败")</script>')
      }
    })
  },
  // 删除歌曲
  getDeletePage: (req, res) => {
    const id = req.params.musicId
    const objectId = databaseManager.ObjectId(id)
    databaseManager.deleteOne('musics', { _id: objectId }, (result) => {
      let resultObj = {
        status: 1,
        message: "删除成功"
      }
      if (result == null) {
        resultObj.status = 0
        resultObj.message = '删除失败'
      }
      res.json(resultObj)
    })
  }
}