'use strict'
const path = require('path')
const MongoClient = require('mongodb').MongoClient
const xtpl = require('xtpl')

module.exports.getMusicList = (req, res) => {
  console.log(req.body)
  const url = 'mongodb://localhost:27017/musicmanager'
  // 连接数据库
  MongoClient.connect(url, (error, db) => {
    db.collection('musics').find({}).toArray((error, docs) => {
      if (error) console.log(error)
      xtpl.renderFile(path.join(__dirname, '../views/studentlist.html'), {
        musics: docs
      }, (error, content) => {
        if (error) console.log(error)
        res.setHeader('Content-Type', 'text/html;charset=utf-8')
        res.end(content)
      })
    })
  })
}