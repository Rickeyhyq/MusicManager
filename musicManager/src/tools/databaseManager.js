'use strict'
const MongoClient = require('mongodb').MongoClient

const url = 'mongodb://localhost:27017/musicmanager'

// 定义一个全局变量
let mydb = null

// 连接数据库
MongoClient.connect(url, (error, db) => {
  if (error) console.log(error)
  // 将db对象赋值给全局变量mydb
  mydb = db
})

// 导出操作数据库的一些方法
module.exports = {
  findOne: (collectionName, options, callback) => {
    mydb.collection(collectionName).findOne(options, (error, docs) => {
      if (error) console.log(error)
      callback(docs)
    })
  },
  insertOne: (collectionName, options, callback) => {
    mydb.collection(collectionName).insertOne(options, (error, result) => {
      if (error) console.log(error)
      const insertSuccess = result.result.n
      callback(insertSuccess)
    })
  },
  findList: (collectionName, options, callback) => {
    mydb.collection(collectionName).find(options).toArray((error, docs) => {
      if (error) console.log(error)
      callback(docs)
    })
  },
  updateOne: (collectionName, options, updateDoc, callback) => {
    mydb.collection(collectionName).updateOne(options, { $set: updateDoc }, (error, result) => {
      if (error) console.log(error)
      callback(result.result.nModified)
    })
  },
  deleteOne: (collectionName, options, callback) => {
    mydb.collection(collectionName).updateOne(options, (error, result) => {
      if (error) console.log(error)
      if (doc != null) {
        callback(true)
      } else {
        callback(false)
      }
    })
  }
}