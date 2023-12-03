import React from 'react';

const PlayerContainer = (props) => {
    return (
        <div className='player_container-info'>
            <img src={props.figure} alt={props.alt} /> 
            <div className="player_container-info-fio">
                <p>{props.fio}</p>
                <p className="player-info-win">Побед: {props.win}%</p>
            </div>
        </div>
    );
}

export default PlayerContainer;
