import React, { useEffect, useState } from 'react';
import cross from '../../images/cross.svg'
import circle from '../../images/zero.svg'
import axios from 'axios';
const Square = (props) => {
    const cells = props.cells
    const winner = props.winner
    const figure = props.figure
    const [players, setPlayers] = useState([])
    const [figureNext, setFigureNext] = useState([])
    useEffect(() => {
        const testPlayers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/active/activeplayers/');
                const data = response.data; // Получение нужных данных из ответа
                setPlayers(data);
            } catch (error) {
                console.error(error);
                return null; 
            }
        }
        testPlayers()
        const getFigureNext = async () => {
            try {
                const response = await axios.get('http://localhost:5000/next/xisnext')
                setFigureNext(response.data)
            } catch(error) {
                console.error(error);
                return null; 
            }
        }
        getFigureNext()
    })
    // console.log(cells)
    return (
        <button
            className={
                `
                field-play__square 
                field-play__square_${props.id}
                ${cells && cells.includes(props.id - 1) && winner === circle ? 'winner-circle' : ''}
                ${cells && cells.includes(props.id - 1) && winner === cross ? 'winner-cross' : ''}`
                    }
                    disabled={
                        winner ||
                        figure === 'cross' || 
                        figure === 'circle' ? true : false || 
                        players.length === 1 || 
                        (figure === 'cross' && figureNext.x_is_next === false) ||
                        (figure === 'circle' && figureNext.x_is_next === true)
                        }  
                        onClick={props.onclick}>
            <img src={figure === 'cross' ? cross : figure === 'circle' ? circle : ''} alt="" />
        </button>
    );
}

export default Square;
