import '../styles/chat.css';
import { useState, useRef, useContext } from 'react';
import CurrentUserContext from '../contexts/current-user-context';
import io from 'socket.io-client';
const socket = io.connect("http://localhost:3000/");

export default function Chat() {
    const { currentUser } = useContext(CurrentUserContext);
    const [message, setMessage] = useState("");
    const messages = useRef(null);
    const [tags, setTags] = useState([]);

    const sendMessage = (e) => {
        e.preventDefault();
        if (message) {
          socket.emit('chat message', message, currentUser.username);
        }
        setMessage("");
    };

    socket.on('chat message', (msg, sender) => {
        setTags([...tags, {message: msg, sender: sender}]);
        // window.scrollTo(0, document.body.scrollHeight);
    });

    return <>
    <ul id="messages" ref={messages}>
        {tags.map((tag, index) => (
            <li key={index} data-sender={tag.sender === socket.id ? "me" : "other"}>
                {tag.sender + " says: " + tag.message}
            </li>
        ))}
    </ul>
    <form id="form" action="" onSubmit={sendMessage} >
      <input id="input" autoComplete="off" value={message} onChange={(e) => setMessage(e.target.value)} />
      <button>Send</button>
    </form>
    </>
  }
  