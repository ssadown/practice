import React, { useEffect, useState } from 'react';
import {BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Registration from './pages/Registration';
import './styles/style.css'
import Game from './pages/Game';
import Active from './pages/Active';
import History from './pages/History';
import PlayerList from './pages/PlayerList';
import Rating from './pages/Rating';
import { AuthContext, ErrorContext, GameContext, NavContext, PlayerContext, SecondsContext, allPlayersContext, winnerContext } from './context/context';

const App = () => {
// МЭЙН
  const [isLogin, setLogin] = useState(false)
  const [error, setError] = useState(false)
  const [navId, setNavId] = useState(1)
  const [xIsNext, setXIsNext] = useState(true)
  const [seconds, setSeconds] = useState(600)
  const [player, setPlayer] = useState()
  const [allPlayers, setAllPlayers] = useState([])
  const [winner, setWinner] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('login')) {
        setLogin(true)
    }
}, [])

  return (
    !isLogin ?
    <allPlayersContext.Provider value={{allPlayers, setAllPlayers}}>
    <PlayerContext.Provider value={{player, setPlayer}}>
      <ErrorContext.Provider value={{error, setError}}>
        <AuthContext.Provider value={{isLogin, setLogin}}>
          <BrowserRouter>
            <Routes>
              <Route exact path="/" element={<Registration/>}/>
              <Route exact path="*" element={<Navigate to="/" replace/>}/>
            </Routes>
          </BrowserRouter>
        </AuthContext.Provider>
      </ErrorContext.Provider>
    </PlayerContext.Provider>
    </allPlayersContext.Provider>
    :
    <winnerContext.Provider value={{winner, setWinner}}>
    <allPlayersContext.Provider value={{allPlayers, setAllPlayers}}>
    <PlayerContext.Provider value={{player, setPlayer,allPlayers, setAllPlayers}}>
    <SecondsContext.Provider value={{seconds, setSeconds}}>
      <GameContext.Provider value={{xIsNext, setXIsNext}}>
        <NavContext.Provider value={{navId, setNavId}}>
            <AuthContext.Provider value={{isLogin, setLogin, error, setError}}>
              <BrowserRouter>
                <Routes>
                  <Route exact path="/" element={<Navigate to="/game" replace/>}/>
                  <Route exact path="/game" element={<Game/>}/>
                  <Route exact path="/active" element={<Active/>}/>
                  <Route exact path="/history" element={<History/>}/>
                  <Route exact path="/players" element={<PlayerList/>}/>
                  <Route exact path="/Rating" element={<Rating/>}/>
                </Routes>
              </BrowserRouter>
            </AuthContext.Provider>
        </NavContext.Provider>
      </GameContext.Provider>
    </SecondsContext.Provider>
  </PlayerContext.Provider>
  </allPlayersContext.Provider>
    </winnerContext.Provider>
  );
}

export default App;
