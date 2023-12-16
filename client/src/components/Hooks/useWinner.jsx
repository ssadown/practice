import { useEffect, useState } from "react";
import axios from "axios";

export const useWinner = (squares) => {
    const [seconds, setSeconds] = useState(0);
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
    }, [seconds]);
    // Все возможные комбинации выигрышных линий
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8], // Горизонтальные линии
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8], // Вертикальные линии
        [0, 4, 8],
        [2, 4, 6] // Диагональные линии
    ];
    // Проверяем все возможные комбинации
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (
            squares[a].square_figure &&
            squares[a].square_figure === squares[b].square_figure &&
            squares[a].square_figure === squares[c].square_figure
        ) {
        return squares[a].square_figure; // Возвращаем символ победителя
        }
    }
    // Проверяем на ничью
    let isDraw = true;
    if (seconds === 0) {
        return 'draw'
    }
    for (let i = 0; i < squares.length; i++) {
        if (!squares[i].square_figure) {
            isDraw = false;
            break;
        }
    }
    if (isDraw) {
        return 'draw'; // Возвращаем "draw", если ничья
    }
}