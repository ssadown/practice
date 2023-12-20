import React, { useEffect, useState } from 'react';
import Square from './Square';
import axios from 'axios';

const Field = (props) => {
    const cells = props.cells
    const [getSquares,setGetSquares] =useState([])
    useEffect( () => {
        try {
            const getSquares = async () => {
                const squaresData = await axios.get('http://localhost:5000/square/squares')
                setGetSquares(squaresData.data)
            }
            getSquares()
        } catch (e) {
            console.log(e)
        }
    }, [getSquares])
    return (
        <div className="field-play">
            {props.playSquares.map((el) => {
                return (
                    <Square
                        onclick={() => props.playerMove(el.square_id - 1)}
                        cells={cells} 
                        winner={props.winner} 
                        figure={getSquares.find(square => square.square_id === el.square_id)?.square_figure} 
                        id={el.square_id} 
                        key={el.square_id}
                    />
                )
            })}
        </div>
    );
}

export default Field;
