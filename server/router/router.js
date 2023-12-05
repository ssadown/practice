const Router = require('express')
const router = new Router()
const controller = require('../controller/playerController')

router.post('/players', controller.addPlayer)
router.put('/players', controller.updatePlayer)
router.delete('/players/:id', controller.deletePlayer)
router.get('/players', controller.getAllPlayers)
router.get('/players/:nickname', controller.getPlayer)

module.exports = router