import React, { useContext } from 'react';
import { ErrorContext } from '../../context/context';

const InputForm = (props) => {
    const error = useContext(ErrorContext)
    return (
        <div className='form-elements'>
            <input type={props.inputType} placeholder={props.inputPlaceholder} className={error.error !== true ? 'input-form' : 'input-form input-form-error'}/>
            <p className={error.error !== true ? 'form-error-text' : ''}>{props.error}</p>
        </div>
    );
}

export default InputForm;
