import React from 'react';
import Navigation from '../components/Navigation';
import HistoryBlock from '../components/HistoryBlock';

const History = () => {
    return (
        <div className='wrapper'>
            <Navigation/>
            <div className="content-history">
                <HistoryBlock/>
            </div>
        </div>
    );
}

export default History;
