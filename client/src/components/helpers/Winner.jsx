import React, { useContext, useEffect } from 'react';
import { GameContext, allPlayersContext, winnerContext } from '../../context/context';
import circle from '../../images/zero.svg'
import cross from '../../images/cross.svg'
import axios from 'axios'

const Winner = (props) => {
    const game = useContext(GameContext)
    const allPlayers = useContext(allPlayersContext)
    const win = useContext(winnerContext)
    useEffect(() => {
        if (props.winner) {
            win.setWinner(true)
        }

        const addWin = async () => {
            for (let i = 0; i < allPlayers.allPlayers.length; i++) {
                const currentPlayer = allPlayers.allPlayers[i]
                if (props.winner === cross && currentPlayer.player_figure === 'cross') {
                    try {
                        await axios.put('http://localhost:5000/players', {
                            player_id: currentPlayer.player_id,
                            player_figure: currentPlayer.player_figure,
                            player_wins: currentPlayer.player_wins + 1,
                            player_loss: currentPlayer.player_loss
                        })
                        allPlayers.allPlayers[i].player_wins += 1
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
                        allPlayers.allPlayers[i].player_loss += 1
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
                        allPlayers.allPlayers[i].player_loss += 1
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
                        allPlayers.allPlayers[i].player_wins += 1
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
    }, [props.winner, allPlayers.allPlayers, win.winner, win.setWinner, win])
    return (
        <div className="field-play__status" onClick={props.clearSquares}>
            {props.winner && props.winner !== 'draw' && <p> Победитель <div className="field-play__status-img"><img src={props.winner} width={30} height={30} alt='ход'/></div></p>}
            {!props.winner && <p>Ходит <div className="field-play__status-img"><img src={game.xIsNext ? cross : circle} width={30} height={30} alt='ход'/></div></p>}
            {props.winner === 'draw' && <p>Ничья</p>}
        </div>
    );
}

export default Winner;
