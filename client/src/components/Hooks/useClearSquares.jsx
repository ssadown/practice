import { useContext } from "react";
import { GameContext, winnerContext} from "../../context/context";
import axios from "axios";

export const useClearSquares = (playSquares,setPlaySquares) => {
    const game = useContext(GameContext)
    const win = useContext(winnerContext)
    const clear = async () => {
        const newPlaySquares = playSquares.map(square => ({ ...square, figure: null }));
        setPlaySquares(newPlaySquares);
        game.setXIsNext(true);
        await axios.put('http://localhost:5000/time/timer/', {
            seconds: 600
        }, () => {console.log('Обновил!')})
        win.setWinner(false)
    }
    return clear
}