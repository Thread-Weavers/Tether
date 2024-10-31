import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CurrentUserContext from "../contexts/current-user-context";
import { getUser } from "../adapters/user-adapter";
import { logUserOut } from "../adapters/auth-adapter";
import SiteHeadingAndNav from '../components/SiteHeadingAndNav';
import UpdateUsernameForm from "../components/UpdateUsernameForm";
import Bio from "../components/Bio";
import Goals from "../components/Goals";
import Reminders from "../components/Reminders";
import Rituals from "../components/Rituals";
import styles from '../styles/profile.module.css';

export default function UserPage() {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [userProfile, setUserProfile] = useState(null);
  const [errorText, setErrorText] = useState(null);
  const { id } = useParams();
  const isCurrentUserProfile = currentUser && currentUser.id === Number(id);

  useEffect(() => {
    const loadUser = async () => {
      const [user, error] = await getUser(id);
      if (error) return setErrorText(error.message);
      setUserProfile(user);
    };

    loadUser();
  }, [id]);

  const handleLogout = async () => {
    logUserOut();
    setCurrentUser(null);
    navigate('/');
  };

  if (!userProfile && !errorText) return null;
  if (errorText) return <p>{errorText}</p>;

  // What parts of state would change if we altered our currentUser context?
  // Ideally, this would update if we mutated it
  // But we also have to consider that we may NOT be on the current users page
  const profileUsername = isCurrentUserProfile ? currentUser.username : userProfile.username;

  return <>
  <SiteHeadingAndNav />
    <div className={styles.profileSection}>
      <div className={styles.profileContainer}>
        <h1>Welcome, {profileUsername}!</h1>
        <div className={styles.usernameForm}>
        {
          !!isCurrentUserProfile
          && <UpdateUsernameForm currentUser={currentUser} setCurrentUser={setCurrentUser} />
        }
        </div>
        {!!isCurrentUserProfile && <button onClick={handleLogout}>Log Out</button>}
      </div>
      <Bio className={styles.bioContainer} />
    </div>
    <div className={styles.listItems}>
      <Goals className={styles.profileSection} />
      <Reminders className={styles.profileSection} />
      <Rituals className={styles.profileSection}/>
    </div>
  </>;
}
