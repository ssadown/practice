import React from 'react';
import Navigation from '../components/Navigation';
import PlayingField from '../components/PlayingField';
import Players from '../components/Players';
import Chat from '../components/Chat';

const Check = () => {
    return (
        <div>
            <div className="wrapper">
            <Navigation/>
            <div className="content">
                <Players/>
                <PlayingField/>
                <Chat/>
            </div>
            </div>
        </div>
    );
}

export default Check;
