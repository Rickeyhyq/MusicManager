'use strict'
const MongoClient = require('mongodb').MongoClient
const path = require('path')

const url = 'mongodb://localhost:27017/musicmanager'

let mydb = null
MongoClient.connect(url, (error, db) => {
  if (error) console.log(error)
  mydb = db
})

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