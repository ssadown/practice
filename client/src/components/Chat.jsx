import React, { useContext, useEffect, useState} from 'react';
import Arrow from '../images/Arrow.svg'
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
            await axios.post(`http://localhost:5000/chat/message/`, {
                author: playerInfo.player[0].player_nickname,
                mess_time: `${new Date().getHours()}:${new Date().getMinutes()}`,
                mess_description: mess,
                player_figure: playerInfo.player[0].player_figure
            })
            const messagesData = await axios.get(`http://localhost:5000/chat/message/`)
            setMessages(messagesData.data)
            setMess('')
            console.log(messages)
        } catch (e) {
            console.log(e)
        }
    };
    useEffect(() => {
        const getMessages = async () => {
            try {
            const messagesData = await axios.get(
                'http://localhost:5000/chat/message/'
            );
            setMessages(messagesData.data);
            } catch (e) {
            console.log(e);
            }
        };
    
        // Получить сообщения при загрузке страницы
        getMessages();
    
        // Установить интервал для получения сообщений в режиме реального времени
        const interval = setInterval(getMessages, 500);
    
        // Отписаться от интервала при размонтировании компонента
        return () => {
            clearInterval(interval);
        };
        }, []);
    return (
        <div className='side_content side_content-second'>
            <div className="chat-container">
                <div className={`chat-container__messages ${messages.length > 1 ? 'chat-container__messages-overflow' : ''}`}>
                    {messages.map((el) => {
                        return (
                            <div className="message-container" key={el.mess_id}>
                                <div className="message-container__info">
                                    <p className={el.player_figure === 'cross' ? 'fio_1' : 'fio_2'}>{el.author}</p>
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
