import { useContext, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignUpPage from './pages/SignUp';
import LoginPage from './pages/Login';
import NotFoundPage from './pages/NotFound';
import UserContext from './contexts/current-user-context';
import WebSocketContext from './contexts/web-socket-context';
import { checkForLoggedInUser } from './adapters/auth-adapter';
import UserPage from './pages/User';
import ProfilePage from './pages/Profile';
import YourTetherPage from './pages/YourTether';
import QuestionnairePage from './pages/QuestionnairePage';
import Chat from './pages/Chat';
import io from 'socket.io-client';

export default function App() {
  const { setCurrentUser } = useContext(UserContext);
  const { setWebSocket } = useContext(WebSocketContext);

  useEffect(() => {
    const setup = async () => {
      const user = await checkForLoggedInUser();
      setCurrentUser(user);
      const socket = io.connect(`http://${window.location.host}`);
      socket.emit('user', user.id);
      setWebSocket(socket);
    }
    setup();
  }, [setCurrentUser]);

  return <>
    <main>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/questionnaire' element={<QuestionnairePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/sign-up' element={<SignUpPage />} />
        <Route path='/users/:id' element={<UserPage />} />
        <Route path='/users/:id/profile' element={<ProfilePage />} />
        <Route path='/users/:id/your-tether' element={<YourTetherPage />} />
        <Route path='/chat' element={<Chat />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </main>
  </>;
}
