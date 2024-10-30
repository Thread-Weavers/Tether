import { NavLink } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../contexts/current-user-context";
// import "../styles/index.css"

export default function SiteHeadingAndNav() {
  const { currentUser } = useContext(CurrentUserContext);

  return currentUser ? 
    <header>
      <nav>
        <h1><NavLink className="navText" to={`/users/${currentUser.id}`}>Tether</NavLink></h1>
        <ul className="NavList">
          <li><NavLink className="navText" to='/chat'>Chat</NavLink></li>
          <li><NavLink className="navText" to={`/your-tether`}>Your Tether</NavLink></li>
          <li><NavLink className="navText" to={`/users/${currentUser.id}`}>{currentUser.username}</NavLink></li>
        </ul>
      </nav>
    </header> :
    <header>
      <h1>Tether</h1>
    </header>;
}
