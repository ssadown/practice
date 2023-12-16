const Router = require('express')
const squareRouter = new Router()
const squareController = require('../controller/squareController')

squareRouter.put('/squares', squareController.updateSquare)
squareRouter.get('/squares', squareController.getSquares)
module.exports = squareRouter