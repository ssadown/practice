const db = require('../db')
class winnerController {
    async updateWinner(req, res) {
        const {winner} = req.body
        const win = await db.query(`UPDATE win SET winner = $1 where winner_id = 1 RETURNING *`, [winner])
        res.json(win.rows[0])
    }
    async getWinner(req, res) {
        const winner = await db.query('SELECT * FROM win')
        res.json(winner.rows)
    }
}
module.exports = new winnerController()