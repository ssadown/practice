import React, { useContext } from 'react';
import InputForm from './helpers/InputForm';
import Button from './helpers/Button';
import { AuthContext } from '../context/context';

const Form = (props) => {
    const isLogin = useContext(AuthContext)
    const login = () => {
        isLogin.setLogin(true)
        localStorage.setItem('login', 'true')
    }
    if (props.reg === true) {
        return (
            <div className='form-block' onSubmit={login}>
                <form className='form-container'>
                    <InputForm inputType='text' inputPlaceholder='Никнейм' error='Такой логин есть!'/>
                    <InputForm inputType='password' inputPlaceholder='Пароль' error='Неправильный пароль!'/>
                    <Button text='Зарегистрироваться'/>
                </form>
            </div>
        );
    }
        return (
            <div className='form-block'>
                <form className='form-container'>
                    <InputForm inputType='text' inputPlaceholder='Никнейм' error='Неправильный логин!'/>
                    <InputForm inputType='password' inputPlaceholder='Пароль' error='Неправильный пароль!'/>
                    <Button text='Войти'/>
                </form>
            </div>
        );
}

export default Form;
