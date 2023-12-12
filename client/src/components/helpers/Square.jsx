import React from 'react';
import cross from '../../images/cross.svg'
import circle from '../../images/zero.svg'
const Square = (props) => {
    const cells = props.cells
    const winner = props.winner
    return (
        <button
            className={
                `
                field-play__square field-play__square_${props.id} ${cells && cells.includes(props.id-1) && winner === circle ? 'winner-circle' : ''}
                ${
                    cells && cells.includes(props.id-1) && winner === cross ? 'winner-cross' : ''
                    }`
                    }
                    disabled={winner || props.figure === cross || props.figure === circle ? true : false}  onClick={props.onclick}>
            <img src={props.figure} alt="" />
        </button>
    );
}

export default Square;
