import React, { useContext, useEffect } from 'react';
import { SecondsContext } from '../../context/context';
import { formatTime } from '../Formater/timerFormater';

const Timer = (props) => {
    const time = useContext(SecondsContext)
    useEffect(() => {
        let interval
        if (time.seconds > 0) {
            interval = setInterval(() => {
                time.setSeconds((prevSeconds) => prevSeconds - 1)
            }, 1000)
        }
        else {
            clearInterval(interval)
        }
        if (props.winner){
            return clearInterval(interval)
        }
        return () => clearInterval(interval)
    },[time, props])
    return (
        <div className='timer'>
            <h1>{formatTime(time.seconds)}</h1>
        </div>
    );
}

export default Timer;
