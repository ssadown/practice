const Router = require('express')
const chatRouter = new Router()
const chatController = require('../controller/chatController')

chatRouter.post('/message', chatController.addMessage)
chatRouter.get('/message/:id', chatController.getMessages)
chatRouter.delete('/message', chatController.deleteMessages)
module.exports = chatRouter