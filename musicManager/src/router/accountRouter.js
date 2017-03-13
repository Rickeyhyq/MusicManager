'use strict'
const express = require('express')
const path = require('path')

const accountRouter = express.Router()

router.get('/login', accountCtrl.getLoginPage)

router.post('/login', accountCtrl.login)