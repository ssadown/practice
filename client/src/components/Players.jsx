import React from 'react';
import PlayerContainer from './helpers/PlayerContainer';
import cross from '../images/cross.svg'
import circle from '../images/zero.svg'

const Players = () => {
    return (
        <div className='side_content'>
            <div className="players_status">
                <h2>Игроки</h2>
                <PlayerContainer figure={cross} alt={'Cross'} fio={'Иванов Иван Иванович'} win={'68'}/>
                <PlayerContainer figure={circle} alt={'Circle'} fio={'Артемов Артем Артемович'} win={'32'}/>
            </div>
        </div>
    );
}

export default Players;
