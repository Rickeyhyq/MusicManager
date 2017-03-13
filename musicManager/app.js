'use strict'

const express = require('express')
const path = require('path')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({
  extended: false
}))

// app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.end('OK')
})

const accountRouter = require(path.join(__dirname, './src/router/accountRouter.js'))
const musicManagerRouter = require(path.join(__dirname, './src/router/musicManagerRouter.js'))

app.use(express.static(path.join(__dirname, './src/statics')))
app.use('/account', accountRouter)
app.use('/list', musicManagerRouter)

app.listen(5000, (error) => {
  if (error) console.log(error)
  console.log('start server success')
})