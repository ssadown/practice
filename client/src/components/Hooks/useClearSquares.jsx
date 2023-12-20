import { useContext } from "react";
import { GameContext, winnerContext} from "../../context/context";
import axios from "axios";

export const useClearSquares = (playSquares,setPlaySquares) => {
    const game = useContext(GameContext)
    const win = useContext(winnerContext)
    const clear = async () => {
        try {
            const newPlaySquares = playSquares.map(square => ({ ...square, square_figure: null }));
            setPlaySquares(newPlaySquares);
            game.setXIsNext(true);
            await axios.put('http://localhost:5000/time/timer/', {
                seconds: Number(600)
            }, () => {console.log('Обновил!')})
            await axios.put('http://localhost:5000/win/winner/', {
                winner: false
            }, () => {console.log('поменял')})
            for (let i = 1; i < 10; i++) {
                await axios.put('http://localhost:5000/square/squares', {
                    square_figure: null,
                    square_id: i
                })
            }
            win.setWinner(false)
        } catch (e) {
            console.log(e)
        }
    }
    return clear
}