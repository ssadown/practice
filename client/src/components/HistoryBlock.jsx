import React from 'react';
import HistoryList from './HistoryList'

const HistoryBlock = () => {
    return (
        <div className='history-container'>
            <div className="history-container__header">
                <h3>История игр</h3>
            </div>
            <HistoryList/>
        </div>
    );
}

export default HistoryBlock;
