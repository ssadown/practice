import React from 'react';

const Button = (props) => {
    return (
        <div className='form-elements'>
            <button className='button-help' onClick={props.click}>{props.text}</button>
        </div>
    );
}

export default Button;
