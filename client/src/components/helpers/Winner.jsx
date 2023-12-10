import React, { useContext, useEffect, useState } from 'react';
import { GameContext, winnerContext } from '../../context/context';
import circle from '../../images/zero.svg'
import cross from '../../images/cross.svg'
import axios from 'axios'

const Winner = (props) => {
    const game = useContext(GameContext)
    const win = useContext(winnerContext)
    const [activePlayers, setActivePlayers] = useState([])
    useEffect(() => {
        const getActivePlayers = async () => {
            try {
                const activePlayersData = await axios.get('http://localhost:5000/active/activeplayers');
                // Обновление состояния активных игроков
                setActivePlayers(activePlayersData.data);
                // console.log(activePlayers)
            } catch (e) {
                console.log(e);
            }
        };
        // Получить значения при загрузке страницы
        getActivePlayers();
        // Установить интервал для получения значений в режиме реального времени
        const interval = setInterval(() => {
            getActivePlayers();
        }, 1000);
        // Отписаться от интервала при размонтировании компонента
        return () => {
            clearInterval(interval);
        };
    }, []);


    useEffect(() => {
        if (props.winner) {
            win.setWinner(true)
        }
        const addWin = async () => {
            for (let i = 0; i < activePlayers.length; i++) {
                const currentPlayer = activePlayers[i]
                if (props.winner === cross && currentPlayer.player_figure === 'cross') {
                    try {
                        await axios.put('http://localhost:5000/players', {
                            player_id: currentPlayer.player_id,
                            player_figure: currentPlayer.player_figure,
                            player_wins: currentPlayer.player_wins + 1,
                            player_loss: currentPlayer.player_loss
                        })
                        await axios.put('http://localhost:5000/active/activeplayers/', {
                            player_id: currentPlayer.player_id,
                            player_figure: currentPlayer.player_figure,
                            player_wins: currentPlayer.player_wins + 1,
                            player_loss: currentPlayer.player_loss
                        })

                        console.log('Отправил!')
                    } catch (e) {
                        console.log(e)
                    }
                } else if (props.winner === cross && currentPlayer.player_figure === 'circle') {
                    try {
                        await axios.put('http://localhost:5000/players', {
                            player_id: currentPlayer.player_id,
                            player_figure: currentPlayer.player_figure,
                            player_wins: currentPlayer.player_wins,
                            player_loss: currentPlayer.player_loss + 1
                        })
                        await axios.put('http://localhost:5000/active/activeplayers/', {
                            player_id: currentPlayer.player_id,
                            player_figure: currentPlayer.player_figure,
                            player_wins: currentPlayer.player_wins,
                            player_loss: currentPlayer.player_loss + 1
                        })

                        console.log('Отправил!')
                    } catch (e) {
                        console.log(e)
                    }
                } else if (props.winner === circle && currentPlayer.player_figure === 'cross') {
                    try {
                        await axios.put('http://localhost:5000/players', {
                            player_id: currentPlayer.player_id,
                            player_figure: currentPlayer.player_figure,
                            player_wins: currentPlayer.player_wins,
                            player_loss: currentPlayer.player_loss +1
                        })
                        await axios.put('http://localhost:5000/active/activeplayers/', {
                            player_id: currentPlayer.player_id,
                            player_figure: currentPlayer.player_figure,
                            player_wins: currentPlayer.player_wins,
                            player_loss: currentPlayer.player_loss + 1
                        })

                        console.log('Отправил!')
                    } catch (e) {
                        console.log(e)
                    }
                } else if (props.winner === circle && currentPlayer.player_figure === 'circle') {
                    try {
                        await axios.put('http://localhost:5000/players', {
                            player_id: currentPlayer.player_id,
                            player_figure: currentPlayer.player_figure,
                            player_wins: currentPlayer.player_wins + 1,
                            player_loss: currentPlayer.player_loss
                        })
                        await axios.put('http://localhost:5000/active/activeplayers/', {
                            player_id: currentPlayer.player_id,
                            player_figure: currentPlayer.player_figure,
                            player_wins: currentPlayer.player_wins + 1,
                            player_loss: currentPlayer.player_loss
                        })
                        
                        console.log('Отправил!')
                    } catch (e) {
                        console.log(e)
                    }
                }
            }
        }
        if (win.winner) {
            addWin()
        }
    }, [props.winner, win])
    return (
        <div className="field-play__status" onClick={props.clearSquares}>
            {props.winner && props.winner !== 'draw' && <p> Победитель <div className="field-play__status-img"><img src={props.winner} width={30} height={30} alt='ход'/></div></p>}
            {!props.winner && <p>Ходит <div className="field-play__status-img"><img src={game.xIsNext ? cross : circle} width={30} height={30} alt='ход'/></div></p>}
            {props.winner === 'draw' && <p>Ничья</p>}
        </div>
    );
}

export default Winner;
