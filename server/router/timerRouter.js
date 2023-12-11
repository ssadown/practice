const Router = require('express')
const timerRouter = new Router()
const timerController = require('../controller/timerController')

timerRouter.put('/timer', timerController.updateTime)
timerRouter.get('/timer', timerController.getTime)

module.exports = timerRouter