const Router = require('express')
const winnerRouter = new Router()
const winnerController = require('../controller/winnerController')

winnerRouter.put('/winner', winnerController.updateWinner)
winnerRouter.get('/winner', winnerController.getWinner)

module.exports = winnerRouter