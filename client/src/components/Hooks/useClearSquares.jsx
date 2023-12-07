import { useContext } from "react";
import { GameContext, SecondsContext, winnerContext} from "../../context/context";

export const useClearSquares = (playSquares,setPlaySquares) => {
    const game = useContext(GameContext)
    const time = useContext(SecondsContext)
    const win = useContext(winnerContext)
    const clear = () => {
        const newPlaySquares = playSquares.map(square => ({ ...square, figure: null }));
        setPlaySquares(newPlaySquares);
        game.setXIsNext(true);
        time.setSeconds(600)
        win.setWinner(false)
    }
    return clear
}