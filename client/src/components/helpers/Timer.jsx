import React, { useEffect, useState } from 'react';
import { formatTime } from '../Formater/timerFormater';
import axios from 'axios';

const Timer = (props) => {
    const [seconds, setSeconds] = useState(0);
    const [win, setWin] = useState(false)
    useEffect(() => {
        const fetchWinner = async () => {
            try {
                const winnerData = await axios.get('http://localhost:5000/win/winner/')
                setWin(winnerData.data[0].winner);
            } catch (error) {
                console.log(error);
            }
        }
        fetchWinner()
    }, [])
    useEffect(() => {
        const fetchTimerValue = async () => {
            try {
                const timerValue = await axios.get('http://localhost:5000/time/timer/'); 
                setSeconds(timerValue.data[0].seconds);
                console.log(seconds)
            } catch (error) {
                console.log(error);
            }
        };

        fetchTimerValue();
    }, []);

    useEffect(() => {
        let interval;

        const updateTimer = async (currentSeconds) => {
            await axios.put('http://localhost:5000/time/timer/', {
                seconds: currentSeconds - 1
            })
            setSeconds(currentSeconds - 1);
        };

        if (seconds > 0 && !props.winner) {
            interval = setTimeout(() => updateTimer(seconds), 1000);
        } else if (props.winner) {
            setSeconds(600)
            clearTimeout(interval);
        }

        return () => clearTimeout(interval);
    }, [seconds, props.winner]);

    return (
        <div className='timer'>
            <h1>{formatTime(seconds)}</h1>
        </div>
    );
};

export default Timer;
