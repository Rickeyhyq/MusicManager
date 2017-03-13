'use strict'

const express = require('express')

const app = express()

app.get('/', (req, res) => {
  
  res.end('OK')
})

app.listen(5000, (error) => {
  if (error) console.log(error)
  console.log('start server success')
})