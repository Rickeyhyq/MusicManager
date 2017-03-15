'use strict'
const path = require('path')
const MongoClient = require('mongodb').MongoClient
const xtpl = require('xtpl')

// 导入数据库操作方法
const databaseManager = require(path.join(__dirname, '../tools/databaseManager.js'))

module.exports = {
  getMusicList: (req, res) => {
    databaseManager.findList('musics', {}, (docs) => {
      xtpl.renderFile(path.join(__dirname, '../views/musiclist.html'), {
        musics: docs
      }, (error, content) => {
        if (error) console.log(error)
        res.setHeader('Content-Type', 'text/html;charset=utf-8')
        res.end(content)
      })
    })
  },
  getAddPage: (req, res) => {
    console.log('addPage')
    xtpl.renderFile(path.join(__dirname, '../views/add.html'), (error, content) => {
      if (error) console.log(error)
      res.setHeader('Content-Type', 'text/html;charset=utf-8')
      res.end(content)
    })
  },
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
  }
}