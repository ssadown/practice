import React, { useContext, useState } from 'react';
import InputForm from './helpers/InputForm';
import Button from './helpers/Button';
import { AuthContext, ErrorContext, PlayerContext} from '../context/context';
import axios from 'axios'

const Form = (props) => {
    const isLogin = useContext(AuthContext)
    const error = useContext(ErrorContext)
    const [fio, setFio] = useState('')
    const [nickname, setNickname] = useState('')
    const [password, setPassword] = useState('')
    const playerInfo = useContext(PlayerContext)


    const changeFio = (e) => {
        console.log(fio)
        setFio(e.target.value)
    }
    const changeNickname = (e) => {
        setNickname(e.target.value)
        console.log(nickname)
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
            const xIsNext = await axios.get(`http://localhost:5000/next/xisnext`)
            await axios.put(`http://localhost:5000/players/`, {
                player_id: playerData.data.player_id,
                player_figure: xIsNext.data[0].x_is_next === true ? 'cross' : 'circle',
                player_wins: playerData.data.player_wins,
                player_loss: playerData.data.player_loss
            })
            await axios.put(`http://localhost:5000/next/xisnext`, {
                x_is_next: !xIsNext.data[0].x_is_next
            })
            const playerDataFigure = await axios.get(`http://localhost:5000/players/${nickname}`)
            console.log(playerDataFigure.data)
            playerInfo.player.push(playerDataFigure.data)
            error.setError(false)
            isLogin.setLogin(true)
            localStorage.setItem('login', 'true')
            await axios.post('http://localhost:5000/active/activeplayers', {
                player_id: playerInfo.player[0].player_id,
                player_name: playerInfo.player[0].player_name,
                player_nickname: playerInfo.player[0].player_nickname,
                player_figure: playerInfo.player[0].player_figure
                })
        } catch (e) {
            console.log(e)
            error.setError(true)
        }
    }
    const login = async (event) => {
        event.preventDefault()
        try {
            if (nickname === '' || password === '') {
                error.setError(true)
                return
            }
            const player = await axios.get(`http://localhost:5000/players/${nickname}`)
            if (nickname === player.data.player_nickname && password === player.data.player_password) {
                const xIsNext = await axios.get(`http://localhost:5000/next/xisnext`)
                console.log(xIsNext.data[0].x_is_next)
                await axios.put(`http://localhost:5000/players/`, {
                    player_id: player.data.player_id,
                    player_figure: xIsNext.data[0].x_is_next === true ? 'cross' : 'circle',
                    player_wins: player.data.player_wins,
                    player_loss: player.data.player_loss
                })
                await axios.put(`http://localhost:5000/next/xisnext`, {
                    x_is_next: !xIsNext.data[0].x_is_next
                })
                const playerDataFigure = await axios.get(`http://localhost:5000/players/${nickname}`)
                console.log(playerDataFigure.data)
                playerInfo.player.push(playerDataFigure.data)
                console.log(playerInfo.player[0])
                error.setError(false)
                isLogin.setLogin(true)
                localStorage.setItem('login', 'true')
                await axios.post('http://localhost:5000/active/activeplayers', {
                    player_id: playerInfo.player[0].player_id,
                    player_name: playerInfo.player[0].player_name,
                    player_nickname: playerInfo.player[0].player_nickname,
                    player_figure: playerInfo.player[0].player_figure
                })
            } else {
                error.setError(true)
                return
            }
        } catch (e) {
            console.log(e)
            error.setError(true)
        }
    }
    // рендер
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
