import { useState, useContext, useEffect } from "react";
import CurrentUserContext from "../contexts/current-user-context";
import { updateUser } from "../adapters/user-adapter";

export default function Bio() {
    const { currentUser } = useContext(CurrentUserContext); // Current User
    // Bio States
    const [bio, setBio] = useState("No bio"); // Initial bio
    const [bioValue, setBioValue]  = useState(""); // New bio
    const [isEditingBio, setIsEditingBio] = useState(false); // Show editor
    
    useEffect(() => {
        setBio(currentUser?.bio);
    });

    const updateBio = async () => {
        setBio(bioValue);
        setIsEditingBio(false);
        const user = await updateUser(currentUser.id, "bio", bioValue);
        console.log(user);
    };

    return <>
        <h2>{currentUser?.username}</h2>
        <p>{bio}</p>
        <button onClick={() => setIsEditingBio(true)}>Edit</button>
        {isEditingBio ?
        <div className="edit_modal" >
            <textarea value={bioValue} onChange={(e) => setBioValue(e.target.value)} placeholder="Type your new bio here!!!"/>
            <button onClick={updateBio}>Save</button>
            <button onClick={() => {setBioValue(bio); setIsEditingBio(false)}}>Cancel</button>
        </div>
        : <></>}
    </>
}