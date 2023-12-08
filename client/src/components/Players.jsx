import React, { useEffect, useState } from 'react';
import PlayerContainer from './helpers/PlayerContainer';
import cross from '../images/cross.svg'
import circle from '../images/zero.svg'
import axios from 'axios';

const Players = () => {
    const [players, setPlayers] = useState([])
    useEffect(() => {
        const testPlayers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/active/activeplayers/');
                const data = response.data; // Получение нужных данных из ответа
                setPlayers(data);
            } catch (error) {
                console.error(error);
                return null; // Возвращение значения по умолчанию в случае ошибки
            }
        }
        testPlayers()
    })
    // console.log(players)
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
                {players.map((el) => {
                    return (
                        <PlayerContainer key={el.player_id} figure={el.player_figure === 'cross' ? cross : circle} alt={'figure'} fio={el.player_name} win={avgWin(el)}/>
                    )
                })}
            </div>
        </div>
    );
}

export default Players;
