import '../styles/chat.css';
import { useState, useRef } from 'react';
import io from 'socket.io-client';
const socket = io.connect("http://localhost:3000/");

export default function Chat() {
    const [message, setMessage] = useState("");
    const messages = useRef(null);
    const [tags, setTags] = useState([]);

    const sendMessage = (e) => {
        e.preventDefault();
        const input = e.target.children[0];
        if (input.value) {
          socket.emit('chat message', input.value);
          input.value = '';
        }
    };

    socket.on('chat message', (msg) => {
        setTags([...tags, msg]);
        console.log(msg);
        // window.scrollTo(0, document.body.scrollHeight);
    });
    console.log(tags);

    return <>
    <ul id="messages" ref={messages}>
        {tags.map((tag, index) => (
            <li key={index}>
                {tag}
            </li>
        ))}
    </ul>
    <form id="form" action="" onSubmit={sendMessage} >
      <input id="input" autoComplete="off" value={message} onChange={(e) => setMessage(e.target.value)} />
      <button>Send</button>
    </form>
    </>
  }
  