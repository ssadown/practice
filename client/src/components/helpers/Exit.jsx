import React, { useContext } from 'react';
import exit from '../../images/exit.svg'
import { AuthContext, GameContext, PlayerContext, SecondsContext} from '../../context/context';
import axios from 'axios';
const Exit = () => {
    const isLogin = useContext(AuthContext)
    const game = useContext(GameContext)
    const playerInfo = useContext(PlayerContext)
    const exitLogin = async () => {
        isLogin.setLogin(false)
        game.setXIsNext(true)
        await axios.put('http://localhost:5000/time/timer/', {
            seconds: 600
        })
        localStorage.removeItem('login', 'true')
        localStorage.removeItem('user', `${playerInfo.player.player_nickname}`)
        axios.delete(`http://localhost:5000/active/activeplayers/${playerInfo.player[0].player_id}`)
        axios.delete(`http://localhost:5000/chat/message`)
        playerInfo.player.shift()
    }
    return (
        <div className='exit-block'>
            <img src={exit} alt="Выход" onClick={exitLogin}/>
        </div>
    );
}

export default Exit;
