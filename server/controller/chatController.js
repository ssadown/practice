const db = require('../db')
class chat {
    async addMessage(req, res) {
        const {mess_id, author, mess_time, mess_description, player_figure} = req.body
        const newMessage = await db.query(`INSERT INTO chat (mess_id, author, mess_time, mess_description, player_figure) VALUES ($1, $2, $3, $4, $5) RETURNING *`, [mess_id, author, mess_time, mess_description, player_figure])
        res.json(newMessage.rows[0])
    }
    async getMessages(req, res) {
        const mess_id = req.params.id
        const messages = await db.query('SELECT * FROM chat where mess_id = $1', [mess_id])
        res.json(messages.rows)
    }
    async deleteMessages(req, res) {
        const deleteMessages = await db.query(`TRUNCATE TABLE chat `)
        res.json(deleteMessages.rows[0])
    }
}
module.exports = new chat()