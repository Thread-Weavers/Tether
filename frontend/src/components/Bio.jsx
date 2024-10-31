import { useState, useContext, useEffect } from "react";
import CurrentUserContext from "../contexts/current-user-context";
import { updateUser } from "../adapters/user-adapter";
import styles from '../styles/profile.module.css';

export default function Bio() {
    const { currentUser } = useContext(CurrentUserContext); // Current User
    console.log(currentUser);
    // Bio States
    const [bio, setBio] = useState("Loading bio..."); // Initial bio
    const [bioValue, setBioValue]  = useState(""); // New bio
    const [isEditingBio, setIsEditingBio] = useState(false); // Show editor
    
    useEffect(() => {
        if (currentUser) setBio(currentUser?.bio);
    }, [currentUser]);

    const updateBio = async () => {
        try {
            const user = await updateUser(currentUser.id, "bio", bioValue);
            setBio(bioValue);
            setIsEditingBio(false);
        } catch (error) {
            console.warn(error.message)
        }
    };

    return <>
  <div className={styles.bioContainer}>
    <h2>{currentUser?.username}'s bio</h2>
    <p className={styles.bioText}>{bio}</p>
    <button className={styles.editButton} onClick={() => setIsEditingBio(true)}>Edit</button>
    {isEditingBio && (
      <div className={styles.editModal}>
        <textarea 
          className={styles.bioTextarea} 
          value={bioValue} 
          onChange={(e) => setBioValue(e.target.value)} 
          placeholder="Type your new bio here!!!"
        />
        <div className={styles.modalButtons}>
          <button className={styles.saveButton} onClick={updateBio}>Save</button>
          <button className={styles.cancelButton} onClick={() => {setBioValue(bio); setIsEditingBio(false)}}>Cancel</button>
        </div>
      </div>
    )}
  </div>
</>
}