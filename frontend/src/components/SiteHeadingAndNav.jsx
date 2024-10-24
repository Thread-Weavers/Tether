import { NavLink } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../contexts/current-user-context";

export default function SiteHeadingAndNav() {
  const { currentUser } = useContext(CurrentUserContext);

  return currentUser ? 
    <header>
      <h1><NavLink to={`/users/${currentUser.id}/your-tether`}>Tether</NavLink></h1>
      <nav>
        <ul>
          <li><NavLink to='/chat'>Chat</NavLink></li>
          <li><NavLink to={`/users/${currentUser.id}/your-tether`}>Your Tether</NavLink></li>
          <li><NavLink to={`/users/${currentUser.id}`}>{currentUser.username}</NavLink></li>
        </ul>
      </nav>
    </header> :
    <header>
      <a id='logo' href='/'>Tether</a>
    </header>;
}
