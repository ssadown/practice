import { useContext } from "react";
import { GameContext } from "../../context/context";
import circle from '../../images/zero.svg'
import cross from '../../images/cross.svg'

export const usePlayerMove = ( playSquares, setPlaySquares) => {
    const game = useContext(GameContext)
    const playerMove = (i) => {
        const newPlaySquares = [...playSquares]; // создаем копию массива playSquares
        newPlaySquares[i] = { ...newPlaySquares[i], figure: game.xIsNext ? cross : circle }; // изменяем нужный элемент копии массива
        setPlaySquares(newPlaySquares); // устанавливаем новое состояние
    
        game.setXIsNext(!game.xIsNext);
    }
    return playerMove
}