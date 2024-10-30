import { NavLink } from 'react-router-dom';
import '../styles/home.css';

export default function HomePage() {
  return (
    <div className="homeContainer">
      <div className="homeDiv">
        <h1 className="homeTitle">Tether</h1>
        <p className="homeSubtitle">Support within reach.</p>
        <div className="accountButtons">
          <li><NavLink to="/login" className="button">Login</NavLink></li>
          <li><NavLink to="/sign-up" className="button">Sign Up</NavLink></li>
        </div>
      </div>
    </div>
  );
}
