const Router = require('express')
const activeRouter = new Router()
const activePlayerController = require('../controller/activePlayerController')

activeRouter.post('/activeplayers', activePlayerController.addPlayer)
activeRouter.put('/activeplayers', activePlayerController.updatePlayer)
activeRouter.delete('/activeplayers/:id', activePlayerController.deletePlayer)
activeRouter.get('/activeplayers', activePlayerController.getAllPlayers)
activeRouter.get('/players/:nickname', activePlayerController.getPlayer)


module.exports = activeRouter