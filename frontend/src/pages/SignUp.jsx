import { useContext, useState } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import CurrentUserContext from "../contexts/current-user-context";
import { createUser } from "../adapters/user-adapter";
import SiteHeadingAndNav from '../components/SiteHeadingAndNav';
import "../styles/signup.css";

// Controlling the sign up form is a good idea because we want to add (eventually)
// more validation and provide real time feedback to the user about usernames and passwords
export default function SignUpPage() {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [errorText, setErrorText] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // users shouldn't be able to see the sign up page if they are already logged in.
  // if the currentUser exists in the context, navigate the user to 
  // the /users/:id page for that user, using the currentUser.id value
  if (currentUser) return <Navigate to={`/users/${currentUser.id}`} />;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorText('');
    if (!firstName || !lastName || !username || !email || !password) return setErrorText('Missing Required Information!');

    const [user, error] = await createUser({ first_name: firstName, last_name: lastName, username, email, password });
    if (error) return setErrorText(error.message);

    setCurrentUser(user);
    navigate('/questionnaire');
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'firstName') setFirstName(value);
    if (name === 'lastName') setLastName(value);
    if (name === 'username') setUsername(value);
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
  };

  return (
  <>
     <div className="signupContainer">
      <form className="signupForm" onSubmit={handleSubmit} aria-labelledby="create-heading">
        <h1 className="signupTitle">Sign Up</h1>
        <h2 id="create-heading" className="signupSubtitle">Create New User</h2>

        <label htmlFor="firstName">First Name</label>
        <input
          autoComplete="off"
          type="text"
          id="firstName"
          name="firstName"
          onChange={handleChange}
          value={firstName}
        />

        <label htmlFor="lastName">Last Name</label>
        <input
          autoComplete="off"
          type="text"
          id="lastName"
          name="lastName"
          onChange={handleChange}
          value={lastName}
        />

        <label htmlFor="username">Username</label>
        <input
          autoComplete="off"
          type="text"
          id="username"
          name="username"
          onChange={handleChange}
          value={username}
        />

        <label htmlFor="email">Email</label>
        <input
          autoComplete="off"
          type="email"
          id="email"
          name="email"
          onChange={handleChange}
          value={email}
        />

        <label htmlFor="password">Password</label>
        <input
          autoComplete="off"
          type="password"
          id="password"
          name="password"
          onChange={handleChange}
          value={password}
        />

        <button className="signupButton">Sign Up Now!</button>

        {!!errorText && <p className="errorText">{errorText}</p>}
        <p className="alreadyMemberText">
          Already have an account with us? <Link to="/login" className="link">Log in!</Link>
        </p>
      </form>
    </div>
  </>
  );
}
