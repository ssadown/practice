import React, { useContext } from 'react';
import exit from '../../images/exit.svg'
import { AuthContext, GameContext, SecondsContext } from '../../context/context';
const Exit = () => {
    const isLogin = useContext(AuthContext)
    const game = useContext(GameContext)
    const time = useContext(SecondsContext)
    const exitLogin = () => {
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
