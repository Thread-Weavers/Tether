import { NavLink } from "react-router-dom";
import '../styles/home.css';

export default function HomePage() {
  return <>
  <div // put into a div to center h1 and p
  className="homeDiv"
  >
    <h1 class="text">Tether</h1>
    <p>Support within reach.</p>
    <div className="accountButtons">
      <li><NavLink to='/login'>Login</NavLink></li>
      <li><NavLink to='/sign-up'>Sign Up</NavLink></li>
    </div>
    <div class="line left"></div>
    <div class="line right"></div>
  </div> 
  </>
}
