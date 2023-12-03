import React, { useEffect, useState } from 'react';
import DogPicture from '../components/helpers/DogPicture';
import Form from '../components/Form';
const Registration = () => {
    const [reg, setReg] = useState(true)
    useEffect(() => {
        
    },[reg])
    if (reg) {
        return (
            <div>
                <div className="wrapper">
                    <div className="reg_container">
                        <DogPicture/>
                        <Form reg={reg}/>
                        <button className='account-button' onClick={() => {setReg(false)}}>Есть аккаунт</button>
                    </div>
                </div>
            </div>
        );
    }
        return (
            <div>
            <div className="wrapper">
                <div className="reg_container">
                    <DogPicture/>
                    <Form reg={reg}/>
                    <button className='account-button' onClick={() => {setReg(true)}}>Зарегистрироваться</button>
                </div>
            </div>
        </div>
        )
}

export default Registration;
