import React from 'react';

const HistoryRow = (props) => {
    return (
        <div className="history-list__row">
            <div className="history-list__row-players-col">
                <img src={props.circle} alt="Circle"/>
                <p>{props.firstPlayer} {props.winner === 'circle' ? <img src={props.champ} alt="champ"/> : ''}</p>
                <b className='players-vs__text'>против</b>
                <img src={props.cross} alt="cross" />
                <p>{props.secondPlayer}{props.winner === 'cross' ? <img src={props.champ} alt="champ"/> : ''}</p>
            </div>
            <div className="history-list__row-date-time-col">
                <p>{props.gameDate}</p>
            </div>
            <div className="history-list__row-date-time-col">
                <p>{props.minutes} мин {props.seconds} сек</p>
            </div>
        </div>
    );
}

export default HistoryRow;
