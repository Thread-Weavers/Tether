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
    const [loading, setLoading] = useState(true); // load bio
    
    console.log(bio);
    useEffect(() => {
        if (currentUser) setBio(currentUser?.bio);
    }, [currentUser]);

    const updateBio = async () => {
        setLoading(true);
        try {
            const user = await updateUser(currentUser.id, "bio", bioValue);
            setBio(bioValue);
            setIsEditingBio(false);
        } catch (error) {
            console.warn(error.message)
            
        }
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