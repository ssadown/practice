import React, { useContext } from 'react';
import PlayerContainer from './helpers/PlayerContainer';
import cross from '../images/cross.svg'
import circle from '../images/zero.svg'
import { PlayerContext } from '../context/context';

const Players = () => {
    const playerInfo = useContext(PlayerContext)
    const avgWin = () => {
        return (Math.floor((playerInfo.player.player_wins / playerInfo.player.player_loss) * 100))
    }
    return (
        <div className='side_content'>
            <div className="players_status">
                <h2>Игроки</h2>
                <PlayerContainer figure={cross} alt={'Cross'} fio={playerInfo.player.player_name} win={avgWin}/>
                <PlayerContainer figure={circle} alt={'Circle'} fio={'Артемов Артем Артемович'} win={'32'}/>
            </div>
        </div>
    );
}

export default Players;
