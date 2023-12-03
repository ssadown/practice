import React from 'react';

const Square = (props) => {
    return (
        <button className={`field-play__square field-play__square_${props.id}`} disabled={props.winner ? true : false}  onClick={props.onclick}>
            <img src={props.figure} alt="" />
        </button>
    );
}

export default Square;
