import axios from "axios"
import { useContext } from "react"
import { AuthContext, ErrorContext, PlayerContext } from "../../context/context"

export const useLoginHook = () => {
    const useLogin = async (event, nickname, password) => {
        event.preventDefault()
        const playerInfo = useContext(PlayerContext)
        const error = useContext(ErrorContext)
        const isLogin = useContext(AuthContext)
        try {
            if (nickname === '' || password === '') {
                error.setError(true)
                return
            }
            const player = await axios.get(`http://localhost:5000/players/${nickname}`)
            if (nickname === player.data.player_nickname && password === player.data.player_password) {
                const xIsNext = await axios.get(`http://localhost:5000/next/xisnext`)
                console.log(xIsNext.data[0].x_is_next)
                await axios.put(`http://localhost:5000/players/`, {
                    player_id: player.data.player_id,
                    player_figure: xIsNext.data[0].x_is_next === true ? 'cross' : 'circle',
                    player_wins: player.data.player_wins,
                    player_loss: player.data.player_loss
                })
                await axios.put(`http://localhost:5000/next/xisnext`, {
                    x_is_next: !xIsNext.data[0].x_is_next
                })
                const playerDataFigure = await axios.get(`http://localhost:5000/players/${nickname}`)
                console.log(playerDataFigure.data)
                playerInfo.player.push(playerDataFigure.data)
                console.log(playerInfo.player[0])
                error.setError(false)
                isLogin.setLogin(true)
                localStorage.setItem('login', 'true')
                await axios.post('http://localhost:5000/active/activeplayers', {
                    player_id: playerInfo.player[0].player_id,
                    player_name: playerInfo.player[0].player_name,
                    player_nickname: playerInfo.player[0].player_nickname,
                    player_figure: playerInfo.player[0].player_figure,
                    player_wins: playerInfo.player[0].player_wins,
                    player_loss: playerInfo.player[0].player_loss
                })
            } else {
                error.setError(true)
                return
            }
        } catch (e) {
            console.log(e)
            error.setError(true)
        }
    }
    return useLogin
}