import { useState, useContext, useEffect } from "react";
import CurrentUserContext from "../contexts/current-user-context";
import { updateUser } from "../adapters/user-adapter";

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
  <div className="bioContainer">
    <h2>{currentUser?.username}</h2>
    <p className="bioText">{bio}</p>
    <button className="editButton" onClick={() => setIsEditingBio(true)}>Edit</button>
    {isEditingBio && (
      <div className="editModal">
        <textarea 
          className="bioTextarea" 
          value={bioValue} 
          onChange={(e) => setBioValue(e.target.value)} 
          placeholder="Type your new bio here!!!"
        />
        <div className="modalButtons">
          <button className="saveButton" onClick={updateBio}>Save</button>
          <button className="cancelButton" onClick={() => {setBioValue(bio); setIsEditingBio(false)}}>Cancel</button>
        </div>
      </div>
    )}
  </div>
</>
}