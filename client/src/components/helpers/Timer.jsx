import React, { useContext, useEffect, useState } from 'react';
import { formatTime } from '../Formater/timerFormater';
import axios from 'axios';
import { winnerContext } from '../../context/context';
import cross from '../../images/cross.svg'
import zero from '../../images/zero.svg'

const Timer = (props) => {
    const [seconds, setSeconds] = useState(0);
    const [win, setWin] = useState(false);
    const winContext = useContext(winnerContext);

    useEffect(() => {
        setInterval(() => {        const fetchWinner = async () => {
            try {
                const winnerData = await axios.get('http://localhost:5000/win/winner/');
                setWin(winnerData.data[0].winner);
            } catch (error) {
                console.log(error);
            }
        };

        fetchWinner();}, 500)
    }, [props.winner]);

    useEffect(() => {
        const fetchTimerValue = async () => {
            try {
                const timerValue = await axios.get('http://localhost:5000/time/timer/'); 
                setSeconds(timerValue.data[0].seconds);
            } catch (error) {
                console.log(error);
            }
        };

        fetchTimerValue();
    }, [seconds]);

    useEffect(() => {
        let interval;

        const updateTimer = async (currentSeconds) => {
            try {
                await axios.put('http://localhost:5000/time/timer/', {
                    seconds: currentSeconds - 1
                });
                setSeconds(currentSeconds - 1);
            } catch (error) {
                console.log(error);
            }
        };

        if (seconds > 0 && !props.winner && !win) {
            interval = setTimeout(() => updateTimer(seconds), 1000);
        } else if (props.winner && win) {
            setSeconds(600)
            clearTimeout(interval);
        } else if (win) {
            setSeconds(600)
            clearTimeout(interval);
        }
        
        const changeWinner = async () => {
            try {
                await axios.put('http://localhost:5000/win/winner/', {
                    winner: true
                });
                console.log('Победа');
            } catch (error) {
                console.log(error);
            }
        };

        if (props.winner === cross || props.winner === zero) {
            changeWinner();
            clearTimeout(interval);
        }
        
        return () => {
            if (interval) {
                clearTimeout(interval);
            }
        };
    }, [seconds, props.winner, win]);

    return (
        <div className='timer'>
            <h1>{formatTime(seconds)}</h1>
        </div>
    );
};

export default Timer;
