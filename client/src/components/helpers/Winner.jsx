import React, { useContext } from 'react';
import { GameContext } from '../../context/context';
import circle from '../../images/zero.svg'
import cross from '../../images/cross.svg'

const Winner = (props) => {
    const game = useContext(GameContext)
    return (
        <div className="field-play__status" onClick={props.clearSquares}>
            {props.winner && props.winner !== 'draw' && <p> Победитель <div className="field-play__status-img"><img src={props.winner} width={30} height={30} alt='ход'/></div></p>}
            {!props.winner && <p>Ходит <div className="field-play__status-img"><img src={game.xIsNext ? cross : circle} width={30} height={30} alt='ход'/></div></p>}
            {props.winner === 'draw' && <p>Ничья</p>}
        </div>
    );
}

export default Winner;
