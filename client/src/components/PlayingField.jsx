import React, { useEffect, useState } from 'react';
import Winner from './helpers/Winner';
import Field from './helpers/Field';
import Timer from './helpers/Timer';
import { usePlayerMove } from './Hooks/usePlayerMove';
import { useWinner } from './Hooks/useWinner';
import { useClearSquares } from './Hooks/useClearSquares';
import { useWinningCells } from './Hooks/useWinningCells';
import axios from 'axios';

const PlayingField = () => {
    const [playSquares, setPlaySquares] = useState([
        {square_id: 1, square_figure: null},
        {square_id: 2, square_figure: null},
        {square_id: 3, square_figure: null},
        {square_id: 4, square_figure: null},
        {square_id: 5, square_figure: null},
        {square_id: 6, square_figure: null},
        {square_id: 7, square_figure: null},
        {square_id: 8, square_figure: null},
        {square_id: 9, square_figure: null},
    ])
    // useEffect( () => {
    //     try {
    //         const getSquares = async () => {
    //             const squaresData = await axios.get('http://localhost:5000/square/squares')
    //             setPlaySquares(squaresData)
    //         }
    //         getSquares()
    //     } catch (e) {
    //         console.log(e)
    //     }
    //     console.log(playSquares)
    // }, [])
    // функция хода
    const playerMove = usePlayerMove(playSquares, setPlaySquares)
    // Победитель
    const winner = useWinner(playSquares)
        // Очищение клеток
    const clearSquares = useClearSquares(playSquares, setPlaySquares, winner)
    const cells = useWinningCells(playSquares)
    return (
            <div className="field">
                <Timer winner={winner}/>
                <Field playSquares={playSquares} cells={cells} playerMove={playerMove} winner={winner}/>
                <Winner clearSquares={clearSquares} winner={winner}/>
            </div>
    );
}

export default PlayingField;
