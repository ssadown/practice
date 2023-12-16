import React from 'react';
import Square from './Square';

const Field = (props) => {
    const cells = props.cells
    return (
        <div className="field-play">
            {props.playSquares.map((el) => {
                return (
                    <Square onclick={() => props.playerMove(el.square_id - 1)} cells={cells} winner={props.winner} figure={el.square_figure} id={el.square_id} key={el.square_id}/>    
                )
            })}
        </div>
    );
}

export default Field;
