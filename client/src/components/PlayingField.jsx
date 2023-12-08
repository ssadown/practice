import React, { useState } from 'react';
import Winner from './helpers/Winner';
import Field from './helpers/Field';
import Timer from './helpers/Timer';
import { usePlayerMove } from './Hooks/usePlayerMove';
import { useWinner } from './Hooks/useWinner';
import { useClearSquares } from './Hooks/useClearSquares';
import { useWinningCells } from './Hooks/useWinningCells';

const PlayingField = () => {
        // Вычисление победителя
    const [playSquares, setPlaySquares] = useState([
        {id: 1, figure: null},
        {id: 2, figure: null},
        {id: 3, figure: null},
        {id: 4, figure: null},
        {id: 5, figure: null},
        {id: 6, figure: null},
        {id: 7, figure: null},
        {id: 8, figure: null},
        {id: 9, figure: null},
    ])
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
