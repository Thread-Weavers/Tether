import { useContext, useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { logUserIn, checkForLoggedInUser, logUserOut } from "../adapters/auth-adapter";
import CurrentUserContext from "../contexts/current-user-context";

export default function LoginPage() {
  const navigate = useNavigate();
  const [errorText, setErrorText] = useState('');
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  useEffect(() => {
    const fetchUser = async () => {
      const [user] = await checkForLoggedInUser();
      if (user) {
        setCurrentUser(user); // Set current user if logged in
        navigate(`/users/${user.id}/profile`); // Redirect to user page
      }
    };

    fetchUser(); // Check if user is already logged in
  }, [setCurrentUser, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorText('');
    const formData = new FormData(event.target);
    const [user, error] = await logUserIn(Object.fromEntries(formData));

    if (error) return setErrorText(error.message);
    setCurrentUser(user); // Set user in context
    navigate(`/users/${user.id}`); // Redirect to user page
  };

  const handleLogout = async () => {
    await logUserOut(); // Clear cookie
    setCurrentUser(null); // Clear user state
    navigate("/"); // Redirect to home or login page
  };

  if (currentUser) return <Navigate to={`/users/${currentUser.id}`} />;

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit} aria-labelledby="login-heading">
        <h2 id='login-heading'>Log back in!</h2>
        <label htmlFor="username">Username</label>
        <input type="text" autoComplete="username" id="username" name="username" />

        <label htmlFor="password">Password</label>
        <input type="password" autoComplete="current-password" id="password" name="password" />

        <button>Log in!</button>
      </form>
      {!!errorText && <p>{errorText}</p>}
      {currentUser && <button onClick={handleLogout}>Log out</button>}
    </>
  );
}
