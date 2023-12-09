const Router = require('express')
const xRouter = new Router()
const XIsNextController = require('../controller/XisNextController')

xRouter.put('/xisnext', XIsNextController.updateX)
xRouter.get('/xisnext', XIsNextController.getX)

module.exports = xRouter