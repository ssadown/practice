import React, { useContext, useState} from 'react';
import Arrow from '../images/Arrow.svg'
import {chatFormat} from './Formater/chatFormat'
import { PlayerContext } from '../context/context';
import axios from 'axios';

const Chat = () => {
    const [messages, setMessages] = useState([])
    const playerInfo = useContext(PlayerContext)
    const [mess, setMess] = useState('')

    const messageChange = (e) => {
        setMess(e.target.value);
    };
    const sendMessage = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`http://localhost:5000/chat/message`, {
                mess_id: messages.length + 1,
                author: playerInfo.player[0].player_nickname,
                mess_time: `${new Date().getHours()}:${new Date().getMinutes()}`,
                mess_description: mess,
                player_figure: playerInfo.player[0].player_figure
            })
            const messagesData = await axios.get(`http://localhost:5000/chat/message/${messages.length + 1}`)
            messages.push(messagesData.data)
            setMess('')
            console.log(messages)
        } catch (e) {
            console.log(e)
        }
    };
    return (
        <div className='side_content side_content-second'>
            <div className="chat-container">
                <div className={`chat-container__messages ${messages.length > 1 ? 'chat-container__messages-overflow' : ''}`}>
                    {messages.map((el) => {
                        return (
                            <div className="message-container" key={el.mess_id}>
                                <div className="message-container__info">
                                    <p className={playerInfo.player.player_figure === 'cross' ? 'fio_1' : 'fio_2'}>{el.author}</p>
                                    <p className="time">{el.mess_time}</p>
                                </div>
                                <div className="message-container__description">
                                    <p>{el.mess_description}</p>
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
