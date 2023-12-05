import React, { useState} from 'react';
import Arrow from '../images/Arrow.svg'
import {chatFormat} from './Formater/chatFormat'

const Chat = () => {
    const [messages, setMessages] = useState([])
    const [selectedAuthor, setSelectedAuthor] = useState('Ваня')
    
    const authorChange = (e) => {
        setSelectedAuthor(e.target.value);
    };
    const [mess, setMess] = useState('')

    const messageChange = (e) => {
        setMess(e.target.value);
    };
    const sendMessage = (e) => {
        e.preventDefault();
        setMessages((prevMessages) => [
            ...prevMessages,
            { author: selectedAuthor, message: mess, hours: new Date().getHours(), minute: new Date().getMinutes()},
        ]);
        setMess('')
    };
    return (
        <div className='side_content side_content-second'>
            <div className="chat-container">
                <div className={`chat-container__messages ${messages.length > 1 ? 'chat-container__messages-overflow' : ''}`}>
                    {messages.map((el) => {
                        return (
                            <div className="message-container">
                                <div className="message-container__info">
                                    <p className={el.author === 'Ваня' ? 'fio_1' : 'fio_2'}>{el.author}</p>
                                    <p className="time">{chatFormat(el.hours,el.minute)}</p>
                                </div>
                                <div className="message-container__description">
                                    <p>{el.message}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="chat-container__input">
                    <input type='text' placeholder='Сообщение' value={mess} onChange={messageChange}/>
                    <select value={selectedAuthor} onChange={authorChange}>
                        <option value="Ваня">Ваня</option>
                        <option value="Артем">Артем</option>
                    </select>
                    <button onClick={sendMessage}><img src={Arrow} alt='Отправить'/></button>
                </div>
            </div>
        </div>
    );
}

export default Chat;
