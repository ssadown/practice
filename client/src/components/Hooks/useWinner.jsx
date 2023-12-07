import { useContext } from "react";
import { SecondsContext} from "../../context/context";

export const useWinner = (squares) => {
    const time = useContext(SecondsContext)

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
            squares[a].figure &&
            squares[a].figure === squares[b].figure &&
            squares[a].figure === squares[c].figure
        ) {
        return squares[a].figure; // Возвращаем символ победителя
        }
    }
    // Проверяем на ничью
    let isDraw = true;
    if (time.seconds === 0) {
        return 'draw'
    }
    for (let i = 0; i < squares.length; i++) {
        if (!squares[i].figure) {
            isDraw = false;
            break;
        }
    }
    if (isDraw) {
        return 'draw'; // Возвращаем "draw", если ничья
    }
}