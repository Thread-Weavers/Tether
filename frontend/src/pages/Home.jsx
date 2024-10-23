import { NavLink } from "react-router-dom"

export default function HomePage() {
  return <>
  <div // put into a div to center h1 and p
  style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    textAlign: 'center', // Center text horizontally
  }}  
  >
    <h1>Tether</h1>
    <p>Find your link</p>
    <div className="accountButtons">
      <li><NavLink to='/login'>Login</NavLink></li>
      <li><NavLink to='/sign-up'>Sign Up</NavLink></li>
    </div>
  </div> 
  </>
}
