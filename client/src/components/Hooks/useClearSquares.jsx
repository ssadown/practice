import { useContext } from "react";
import { GameContext, SecondsContext } from "../../context/context";

export const useClearSquares = (playSquares,setPlaySquares) => {
    const game = useContext(GameContext)
    const time = useContext(SecondsContext)
    const clear = () => {
        const newPlaySquares = playSquares.map(square => ({ ...square, figure: null }));
        setPlaySquares(newPlaySquares);
        game.setXIsNext(true);
        time.setSeconds(600)
    }
    return clear
}