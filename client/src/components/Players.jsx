import React, { useContext } from 'react';
import PlayerContainer from './helpers/PlayerContainer';
import cross from '../images/cross.svg'
import circle from '../images/zero.svg'
import { allPlayersContext } from '../context/context';

const Players = () => {

    const allPlayers = useContext(allPlayersContext)
    const avgWin = (player) => {
        if (player.player_wins === 0 && player.player_loss === 0) {
            return 0;
        }
        return Math.floor((player.player_wins / (player.player_wins + player.player_loss)) * 100);
        }
        
    return (
        <div className='side_content'>
            <div className="players_status">
                <h2>Игроки</h2>
                {allPlayers.allPlayers.slice(0,2).map((el) => {
                    return (
                        <PlayerContainer key={el.player_id} figure={el.player_figure === 'cross' ? cross : circle} alt={'figure'} fio={el.player_name} win={avgWin(el)}/>
                    )
                })}
            </div>
        </div>
    );
}

export default Players;
