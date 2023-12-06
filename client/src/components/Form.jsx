import React, { useContext, useState } from 'react';
import InputForm from './helpers/InputForm';
import Button from './helpers/Button';
import { AuthContext, ErrorContext, PlayerContext, allPlayersContext} from '../context/context';
import axios from 'axios'

const Form = (props) => {
    const isLogin = useContext(AuthContext)
    const error = useContext(ErrorContext)
    const [fio, setFio] = useState('')
    const [nickname, setNickname] = useState('')
    const [password, setPassword] = useState('')
    const playerInfo = useContext(PlayerContext)
    const allPlayers = useContext(allPlayersContext)
    const changeFio = (e) => {
        console.log(fio)
        setFio(e.target.value)
    }
    const changeNickname = (e) => {
        console.log(nickname)
        setNickname(e.target.value)
    }
    const changePassword = (e) => {
        console.log(password)
        setPassword(e.target.value)
    }
    const register = async (event) => {
        event.preventDefault();
        try {
            if (fio === '' || nickname === '' || password === '') {
                error.setError(true)
                return
            }
        await axios.post('http://localhost:5000/players', {
            player_name: fio,
            player_nickname: nickname,
            player_password: password
            })
            const playerData = await axios.get(`http://localhost:5000/players/${nickname}`)
            playerInfo.setPlayer(playerData.data)
            allPlayers.allPlayers.push(playerData.data) 
            for (let i = 0; i < allPlayers.allPlayers.length; i++) {
                const currentPlayer = allPlayers.allPlayers[i]
                if (i === 0) {
                    await axios.put(`http://localhost:5000/players`, {
                        player_id: currentPlayer.player_id,
                        player_figure: 'cross',
                        player_wins: currentPlayer.player_wins,
                        player_loss: currentPlayer.player_loss
                    })
                    const playerDataFigure = await axios.get(`http://localhost:5000/players/${allPlayers.allPlayers[i].player_nickname}`)
                    allPlayers.allPlayers[i].player_figure = playerDataFigure.data.player_figure
                    playerInfo.setPlayer(playerDataFigure.data)
                    
                } else if (i % 2 === 0) {
                    await axios.put(`http://localhost:5000/players`, {
                        player_id: currentPlayer.player_id,
                        player_figure: 'cross',
                        player_wins: currentPlayer.player_wins,
                        player_loss: currentPlayer.player_loss
                    })
                    const playerDataFigure = await axios.get(`http://localhost:5000/players/${allPlayers.allPlayers[i].player_nickname}`)
                    allPlayers.allPlayers[i].player_figure = playerDataFigure.data.player_figure
                    playerInfo.setPlayer(playerDataFigure.data)
                } else {
                    await axios.put(`http://localhost:5000/players`, {
                        player_id: currentPlayer.player_id,
                        player_figure: 'circle',
                        player_wins: currentPlayer.player_wins,
                        player_loss: currentPlayer.player_loss
                    })
                    const playerDataFigure = await axios.get(`http://localhost:5000/players/${allPlayers.allPlayers[i].player_nickname}`)
                    allPlayers.allPlayers[i].player_figure = playerDataFigure.data.player_figure
                    playerInfo.setPlayer(playerDataFigure.data)
                }
            }
            console.log(allPlayers.allPlayers)
            error.setError(false)
            isLogin.setLogin(true)
            localStorage.setItem('login', 'true')
        } catch (e) {
            error.setError(true)
        }
    }
    const login = async (event) => {
        event.preventDefault()
        try {
            if ( nickname === '' || password === '') {
                error.setError(true)
                return
            }
        const player = await axios.get(`http://localhost:5000/players/${nickname}`)
        console.log(player)
        if (nickname === player.data.player_nickname && password === player.data.player_password) {
            const playerData = await axios.get(`http://localhost:5000/players/${nickname}`)
            playerInfo.setPlayer(playerData.data)
            allPlayers.allPlayers.push(playerData.data) 
            for (let i = 0; i < allPlayers.allPlayers.length; i++) {
                const currentPlayer = allPlayers.allPlayers[i]
                if (i === 0) {
                    await axios.put(`http://localhost:5000/players`, {
                        player_id: currentPlayer.player_id,
                        player_figure: 'cross',
                        player_wins: currentPlayer.player_wins,
                        player_loss: currentPlayer.player_loss
                    })
                    const playerDataFigure = await axios.get(`http://localhost:5000/players/${allPlayers.allPlayers[i].player_nickname}`)
                    allPlayers.allPlayers[i].player_figure = playerDataFigure.data.player_figure
                    playerInfo.setPlayer(playerDataFigure.data)
                    
                } else if (i % 2 === 0) {
                    await axios.put(`http://localhost:5000/players`, {
                        player_id: currentPlayer.player_id,
                        player_figure: 'cross',
                        player_wins: currentPlayer.player_wins,
                        player_loss: currentPlayer.player_loss
                    })
                    const playerDataFigure = await axios.get(`http://localhost:5000/players/${allPlayers.allPlayers[i].player_nickname}`)
                    allPlayers.allPlayers[i].player_figure = playerDataFigure.data.player_figure
                    playerInfo.setPlayer(playerDataFigure.data)
                } else {
                    await axios.put(`http://localhost:5000/players`, {
                        player_id: currentPlayer.player_id,
                        player_figure: 'circle',
                        player_wins: currentPlayer.player_wins,
                        player_loss: currentPlayer.player_loss
                    })
                    const playerDataFigure = await axios.get(`http://localhost:5000/players/${allPlayers.allPlayers[i].player_nickname}`)
                    allPlayers.allPlayers[i].player_figure = playerDataFigure.data.player_figure
                    playerInfo.setPlayer(playerDataFigure.data)
                }
            }
            console.log(allPlayers.allPlayers)
            error.setError(false)
            isLogin.setLogin(true)
            localStorage.setItem('login', 'true')
        } else {
            error.setError(true)
            return
        }
        } catch(e) {
            console.log(e)
            error.setError(true)
        }
    }
    if (props.reg === true) {
        return (
            <div className='form-block' onSubmit={register}>
                <form className='form-container'>
                    <InputForm inputType='text' value={nickname} onChange={changeNickname} inputPlaceholder='Никнейм' error='Такой логин есть!'/>
                    <InputForm inputType='text' value={fio} onChange={changeFio} inputPlaceholder='ФИО' error=''/>
                    <InputForm inputType='password' value={password} onChange={changePassword} inputPlaceholder='Пароль' error='Неправильный пароль!'/>
                    <Button text='Зарегистрироваться'/>
                </form>
            </div>
        );
    }
        return (
            <div className='form-block' onSubmit={login}>
                <form className='form-container'>
                    <InputForm inputType='text' value={nickname} onChange={changeNickname} inputPlaceholder='Никнейм' error='Неправильный логин!'/>
                    <InputForm inputType='password' value={password} onChange={changePassword} inputPlaceholder='Пароль' error='Неправильный пароль!'/>
                    <Button text='Войти'/>
                </form>
            </div>
        );
}

export default Form;
