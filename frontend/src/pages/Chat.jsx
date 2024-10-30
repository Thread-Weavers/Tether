import '../styles/chat.css';
import SiteHeadingAndNav from '../components/SiteHeadingAndNav';
import { useState, useRef, useContext, useEffect } from 'react';
import CurrentUserContext from '../contexts/current-user-context';
import WebSocketContext from '../contexts/web-socket-context';

export default function Chat() {
    const { currentUser } = useContext(CurrentUserContext);
    const { webSocket } = useContext(WebSocketContext);
    const socket = webSocket;
    const [message, setMessage] = useState("");
    const messages = useRef(null);
    const [tags, setTags] = useState([]);

    // Send message handler
    const sendMessage = (e) => {
        e.preventDefault();
        if (message) {
            socket.emit('chat message', message, currentUser.socketId); // Send message with socket ID
            setMessage(""); // Clear the input
        }
    };

    // Receive message handler
    useEffect(() => {
        const handleIncomingMessage = (msg, senderId) => {
            setTags(prevTags => [...prevTags, { message: msg, sender: senderId }]);
            // Optionally scroll to the bottom
            // window.scrollTo(0, document.body.scrollHeight);
        };

        socket.on('chat message', handleIncomingMessage);

        // Cleanup listener on unmount
        return () => {
            socket.off('chat message', handleIncomingMessage);
        };
    }, [socket]); // Ensure socket is in the dependency array

    return (
        <>
            <SiteHeadingAndNav />
            <div className="chatroom">
                <ul id="messages" ref={messages} className="messages">
                    {tags.map((tag, index) => (
                        <li 
                            key={index} 
                            data-sender={tag.sender === currentUser.socketId ? "me" : "other"} 
                            className={tag.sender === currentUser.socketId ? "message me" : "message other"}
                        >
                            {tag.sender === currentUser.socketId ? "You" : tag.sender} says: {tag.message}
                        </li>
                    ))}
                </ul>
                <form id="form" onSubmit={sendMessage} className="chat-form">
                    <input 
                        id="input" 
                        autoComplete="off" 
                        value={message} 
                        onChange={(e) => setMessage(e.target.value)} 
                        className="chat-input" 
                    />
                    <button className="send-button">Send</button>
                </form>
            </div>
        </>
    );
}

  