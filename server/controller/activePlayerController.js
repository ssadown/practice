const db = require('../db')
class activePlayer {
    async addPlayer(req, res) {
        const {player_id, player_name, player_nickname, player_figure, player_wins, player_loss} = req.body
        const newPlayer = await db.query(`INSERT INTO activeplayers (player_id, player_name, player_nickname, player_figure, player_wins, player_loss) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`, [player_id, player_name, player_nickname, player_figure, player_wins, player_loss])
        res.json(newPlayer.rows[0])
    }
    async getPlayer(req, res) {
        const player_nickname = req.params.nickname
        const getPlayer = await db.query('SELECT * FROM players WHERE player_nickname = $1', [player_nickname])
        res.json(getPlayer.rows[0])
    }
    async updatePlayer(req, res) {
        const {player_id, player_wins, player_loss, player_figure} = req.body
        const updatePlayer = await db.query(`UPDATE activeplayers SET player_wins = $1, player_loss = $2, player_figure = $3 where player_id = $4 RETURNING *`, [ player_wins, player_loss,player_figure, player_id])
        res.json(updatePlayer.rows[0])
    }
    async getAllPlayers(req, res) {
        const players = await db.query('SELECT * FROM activeplayers')
        res.json(players.rows)
    }
    async deletePlayer(req, res) {
        const player_id = req.params.id
        const deletePlayer = await db.query(`DELETE FROM activeplayers WHERE player_id = $1`, [player_id])
        res.json(deletePlayer.rows[0])
    }
}
module.exports = new activePlayer()