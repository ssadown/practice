import { useContext } from "react";
import { GameContext, PlayerContext } from "../../context/context";
import circle from '../../images/zero.svg'
import cross from '../../images/cross.svg'

export const usePlayerMove = ( playSquares, setPlaySquares) => {
    const game = useContext(GameContext)
    const playerInfo = useContext(PlayerContext)
    console.log(playerInfo.player)
    const playerMove = (i) => {
        const newPlaySquares = [...playSquares]; // создаем копию массива playSquares
        newPlaySquares[i] = { ...newPlaySquares[i], figure: playerInfo.player[0].player_figure === 'cross' ? cross : circle }; // изменяем нужный элемент копии массива
        setPlaySquares(newPlaySquares); // устанавливаем новое состояние
    
        game.setXIsNext(!game.xIsNext);
    }
    return playerMove
}