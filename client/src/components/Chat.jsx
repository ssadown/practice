import React, { useContext, useState} from 'react';
import Arrow from '../images/Arrow.svg'
import {chatFormat} from './Formater/chatFormat'
import { PlayerContext } from '../context/context';

const Chat = () => {
    const [messages, setMessages] = useState([])
    const playerInfo = useContext(PlayerContext)
    const [mess, setMess] = useState('')

    const messageChange = (e) => {
        setMess(e.target.value);
    };
    const sendMessage = (e) => {
        e.preventDefault();
        setMessages((prevMessages) => [
            ...prevMessages,
            { author: playerInfo.player.player_nickname, message: mess, hours: new Date().getHours(), minute: new Date().getMinutes(), id: messages.length + 1, figure: playerInfo.player.player_figure},
        ]);
        setMess('')
    };
    return (
        <div className='side_content side_content-second'>
            <div className="chat-container">
                <div className={`chat-container__messages ${messages.length > 1 ? 'chat-container__messages-overflow' : ''}`}>
                    {messages.map((el) => {
                        return (
                            <div className="message-container" key={el.id}>
                                <div className="message-container__info">
                                    <p className={playerInfo.player.player_figure === 'cross' ? 'fio_1' : 'fio_2'}>{el.author}</p>
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
                    <button onClick={sendMessage}><img src={Arrow} alt='Отправить'/></button>
                </div>
            </div>
        </div>
    );
}

export default Chat;
