import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import App from './App.jsx';
import UserContextProvider from './contexts/CurrentUserContextProvider.jsx';
import WebSocketContextProvider from './contexts/WebSocketContextProvider.jsx';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <UserContextProvider>
    <WebSocketContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </WebSocketContextProvider>
  </UserContextProvider>,
);
