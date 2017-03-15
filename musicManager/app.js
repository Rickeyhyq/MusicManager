'use strict'

const express = require('express')
const path = require('path')
const app = express()
const bodyParser = require('body-parser')

const session = require('express-session')

app.use(session({
  secret: 'keyboard cat',
  cookie: {
    maxAge: 60000
  }
}))

app.use(bodyParser.urlencoded({
  extended: false
}))

// app.use(bodyParser.json())

app.all('/*', (req, res, next) => {
  if (req.url == '/account/login' || req.url == 'account/register') {
    next()
  } else {
    if (req.session.loginedname == null) {
      res.end("<script>alert('还没有登录,请先登录'); window.location.href='/account/login'</script>")
    } else {
      next()
    }
  }
})

const accountRouter = require(path.join(__dirname, './src/router/accountRouter.js'))
const musicManagerRouter = require(path.join(__dirname, './src/router/musicManagerRouter.js'))

app.use(express.static(path.join(__dirname, './src/statics')))
app.use('/account', accountRouter)
app.use('/musicmanager', musicManagerRouter)

app.listen(5000, (error) => {
  if (error) console.log(error)
  console.log('start server success')
})