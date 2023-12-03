import React, {useState} from 'react';
import Arrow from '../images/Arrow.svg'

const Chat = () => {
    const [messages, setMessages] = useState([])
    const [selectedAuthor, setSelectedAuthor] = useState('Ваня')
    const authorChange = (e) => {
        console.log(selectedAuthor)
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
            { author: selectedAuthor, message: mess },
        ]);
        setMess('')
    };
    return (
        <div className='side_content side_content-second'>
            <div className="chat-container">
                <div className={`chat-container__messages ${messages.length > 7? 'chat-container__messages-overflow' : ''}`}>
                    <div className="messages-top__fade"></div>
                    {messages.map((el) => {
                        return (
                            <p>{el.author}: {el.message}</p>
                        )
                    })}
                    <div className="messages-bottom__fade"></div>
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
