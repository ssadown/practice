import React from 'react';
import dog from '../../images/dog.svg'
const DogPicture = () => {
    return (
        <div className='dog-picture'>
            <img src={dog} alt='dog'/>
            <h1>Войдите в игру</h1>
        </div>
    );
}

export default DogPicture;
