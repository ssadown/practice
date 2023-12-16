import React from 'react';
import circle from '../images/zero.svg'
import cross from '../images/cross.svg'
import champ from '../images/champ.svg'
import HistoryRow from './helpers/HistoryRow';
import { useState } from 'react';
const HistoryList = () => {
    const [gameHistory, setGameHistory] = useState([
        {
            firstPlayer: 'Василевич И.А.',
            secondPlayer: 'Многогрешный П. В.',
            minutes: 48,
            seconds: 12,
            date: '16 декабря 2023',
            winner: 'cross'
        },
        {
            firstPlayer: 'Милюков Л.О.',
            secondPlayer: 'Многогрешный П. В.',
            minutes: 17,
            seconds: 29,
            date: '16 декабря 2023',
            winner: 'circle'
        },
    ])
    return (
        <div className='history-list'>
            <div className="history-list__row">
                <div className="history-list__row-players-col">
                    <b>Игроки</b>
                </div>
                <div className="history-list__row-date-time-col">
                    <b>Дата</b>
                </div>
                <div className="history-list__row-date-time-col">
                    <b>Время игры</b>
                </div>
            </div>
            {gameHistory.map((el) => {
                return (
                    <HistoryRow
                        circle={circle}
                        cross={cross}
                        champ={champ}
                        firstPlayer={el.firstPlayer}
                        secondPlayer={el.secondPlayer}
                        minutes={el.minutes}
                        seconds={el.seconds}
                        gameDate={el.date}
                        winner={el.winner}
                    />
                )
            })}
        </div>
    );
}

export default HistoryList;
