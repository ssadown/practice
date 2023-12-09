const db = require('../db')
class XIsNextController {
    async updateX(req, res) {
        const {x_is_next} = req.body
        const updateX = await db.query(`UPDATE xisnext SET x_is_next = $1 where figure_id = 1 RETURNING *`, [x_is_next])
        res.json(updateX.rows[0])
    }
    async getX(req, res) {
        const xIsNext = await db.query('SELECT * FROM xisnext')
        res.json(xIsNext.rows)
    }
}
module.exports = new XIsNextController()