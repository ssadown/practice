import { useContext } from "react";
import { GameContext, PlayerContext } from "../../context/context";
import circle from '../../images/zero.svg'
import cross from '../../images/cross.svg'
import axios from "axios";

export const usePlayerMove = ( playSquares, setPlaySquares) => {
    const game = useContext(GameContext)
    const playerInfo = useContext(PlayerContext)
    const playerMove = (i) => {
        const newPlaySquares = [...playSquares]; // создаем копию массива playSquares
        newPlaySquares[i] = { ...newPlaySquares[i], square_figure: playerInfo.player[0].player_figure === 'cross' ? cross : circle }; // изменяем нужный элемент копии массива
        setPlaySquares(newPlaySquares); // устанавливаем новое состояние
        const updateSquares = async () => {
            await axios.put('http://localhost:5000/square/squares/', {
                square_figure: playerInfo.player[0].player_figure === 'cross' ? "cross" : "circle",
                square_id: i + 1
            })
        }
        game.setXIsNext(!game.xIsNext);
        updateSquares()
    }
    return playerMove
}