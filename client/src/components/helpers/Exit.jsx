import React, { useContext } from 'react';
import exit from '../../images/exit.svg'
import { AuthContext, GameContext, PlayerContext, SecondsContext} from '../../context/context';
import axios from 'axios';
const Exit = () => {
    const isLogin = useContext(AuthContext)
    const game = useContext(GameContext)
    const time = useContext(SecondsContext)
    const playerInfo = useContext(PlayerContext)
    const exitLogin = () => {
        axios.delete(`http://localhost:5000/active/activeplayers/${playerInfo.player.player_id}`)
        isLogin.setLogin(false)
        game.setXIsNext(true)
        time.setSeconds(600)
        localStorage.removeItem('login', 'true')
    }
    return (
        <div className='exit-block'>
            <img src={exit} alt="Выход" onClick={exitLogin}/>
        </div>
    );
}

export default Exit;
