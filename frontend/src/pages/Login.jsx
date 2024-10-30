import { useContext, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { logUserIn } from "../adapters/auth-adapter";
import CurrentUserContext from "../contexts/current-user-context";
import SiteHeadingAndNav from '../components/SiteHeadingAndNav';
import "../styles/login.css";

export default function LoginPage() {
  const navigate = useNavigate();
  const [errorText, setErrorText] = useState('');
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  // users shouldn't be able to see the login page if they are already logged in.
  // if the currentUser exists in the context, navigate the user to 
  // the /users/:id page for that user, using the currentUser.id value
  if (currentUser) return <Navigate to={`/users/${currentUser.id}`} />;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorText('');
    const formData = new FormData(event.target);
    const [user, error] = await logUserIn(Object.fromEntries(formData));
    if (error) return setErrorText(error.message);
    setCurrentUser(user);
    navigate(`/users/${user.id}`);
  };

  return (
  <>
    <div className="loginContainer">
      <form className="loginForm" onSubmit={handleSubmit} aria-labelledby="login-heading">
        <h1 className="loginTitle">TETHER</h1>
        <h2 id="login-heading" className="loginSubtitle">Log in</h2>

        <label htmlFor="username">Username</label>
        <input type="text" autoComplete="username" id="username" name="username" />

        <label htmlFor="password">Password</label>
        <input type="password" autoComplete="current-password" id="password" name="password" />

        <button className="loginButton">Log in!</button>

        {!!errorText && <p className="errorText">{errorText}</p>}
      </form>
    </div>
  </>
  );
}
