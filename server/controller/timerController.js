const db = require('../db')
class timerController {
    async updateTime(req, res) {
        const {seconds} = req.body
        const updateTime = await db.query(`UPDATE timer SET seconds = $1 where time_id = 1 RETURNING *`, [seconds])
        res.json(updateTime.rows[0])
    }
    async getTime(req, res) {
        const time = await db.query('SELECT * FROM timer ')
        res.json(time.rows)
    }
}
module.exports = new timerController()