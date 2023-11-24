const db = require('../db')
class Game {
    async addPlayer(req, res) {
        const {player_name, player_nickname, player_password} = req.body
        const newPlayer = await db.query(`INSERT INTO players (player_name, player_nickname, player_password) VALUES ($1, $2, $3) RETURNING *`, [player_name, player_nickname, player_password])
        res.json(newPlayer.rows[0])
    }
    async getAllPlayers(req, res) {
        const players = await db.query('SELECT * FROM players')
        res.json(players.rows)
    }
    async getPlayer(req, res) {
        const player_id = req.params.id
        const getPlayer = await db.query('SELECT * FROM players WHERE player_id = $1', [player_id])
        res.json(getPlayer.rows[0])
    }
    async updatePlayer(req, res) {
        const {player_id, player_nickname, player_password, player_name} = req.body
        const updatePlayer = await db.query(`UPDATE players SET player_name = $1, player_password = $2, player_nickname = $3 where player_id = $4 RETURNING *`, [player_id, player_nickname, player_password, player_name])
        res.json(updatePlayer.rows[0])
    }
    async deletePlayer(req, res) {
        const player_id = req.params.id
        const deletePlayer = await db.query(`DELETE FROM players WHERE player_id = $1`, [player_id])
        res.json(deletePlayer.rows[0])
    }
}
module.exports = new Game()