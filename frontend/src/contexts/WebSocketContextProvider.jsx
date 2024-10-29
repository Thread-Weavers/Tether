import { useState } from 'react';
import WebSocketContext from './web-socket-context';

export default function WebSocketContextProvider({ children }) {
  const [webSocket, setWebSocket] = useState(null);
  const context = { webSocket, setWebSocket };

  return (
    <WebSocketContext.Provider value={ context }>
      {children}
    </WebSocketContext.Provider>
  );
}
