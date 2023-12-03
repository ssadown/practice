import React from 'react';
import Square from './Square';

const Field = (props) => {
    return (
        <div className="field-play">
            {props.playSquares.map((el) => {
                return (
                    <Square onclick={() => props.playerMove(el.id - 1)} winner={props.winner} figure={el.figure} id={el.id} key={el.id}/>    
                )
            })}
        </div>
    );
}

export default Field;
