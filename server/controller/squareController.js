const db = require('../db')
class square {
    async updateSquare(req, res) {
        const { square_figure, square_id } = req.body
        const updateSquare = await db.query(`UPDATE squares SET square_figure = $1 where square_id = $2 RETURNING *`, [ square_figure, square_id])
        res.json(updateSquare.rows[0])
    }
    async getSquares(req, res) {
        const squares = await db.query('SELECT * FROM squares')
        res.json(squares.rows)
    }
}
module.exports = new square()