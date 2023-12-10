const db = require('../db')
class chat {
    async addMessage(req, res) {
        const { author, mess_time, mess_description, player_figure} = req.body
        const newMessage = await db.query(`INSERT INTO chat ( author, mess_time, mess_description, player_figure) VALUES ($1, $2, $3, $4) RETURNING *`, [ author, mess_time, mess_description, player_figure])
        res.json(newMessage.rows[0])
    }
    async getMessages(req, res) {
        const messages = await db.query('SELECT * FROM chat')
        res.json(messages.rows)
    }
    async deleteMessages(req, res) {
        const deleteMessages = await db.query(`TRUNCATE TABLE chat `)
        res.json(deleteMessages.rows[0])
    }
}
module.exports = new chat()