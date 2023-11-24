import React from 'react';
import dog from '../images/dog.svg'
const Registration = () => {
    return (
        <div>
            <div className="wrapper">
                <div className="reg_container">
                    <img src={dog} alt='dog'/>
                    <input type='text' placeholder='Никнейм'/>
                    <input type="password" placeholder='Пароль' />
                    <button>Зарегистрироваться</button>
                </div>
            </div>
        </div>
    );
}

export default Registration;
