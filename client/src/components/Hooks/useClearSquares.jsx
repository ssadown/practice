import { useContext } from "react";
import { GameContext, SecondsContext, winnerContext } from "../../context/context";

export const useClearSquares = (playSquares,setPlaySquares) => {
    const game = useContext(GameContext)
    const time = useContext(SecondsContext)
    const winner = useContext(winnerContext)
    const clear = () => {
        const newPlaySquares = playSquares.map(square => ({ ...square, figure: null }));
        setPlaySquares(newPlaySquares);
        winner.setWinner(null)
        game.setXIsNext(true);
        time.setSeconds(600)
    }
    return clear
}