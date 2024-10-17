import { useState, useContext } from "react";
import CurrentUserContext from "../contexts/current-user-context";

export default function Bio() {
    
    //current user
    const { currentUser } = useContext(CurrentUserContext);
    
    // useState to update bio
    const [bio, setBio] = useState("");
    const [bioValue, setBioValue]  = useState('');
    const [isEditingBio, setIsEditingBio] = useState(false);

    // function to click bio 
    const handleBioChange = (e) => setBioValue(e.target.value);

    return <>
    <h2>{currentUser?.username}</h2>
    {isEditingBio ? (
    <>
    <textarea value={bioValue} onChange={handleBioChange} placeholder="Type your bio here!!!"/>
    <button onClick={() => {setIsEditingBio(false); setBio(bioValue)}}>Save</button>
    <button onClick={() => {setIsEditingBio(false); setBioValue(bio)}}>Cancel</button>
    </>
    ) : (
    <>
    <p>{bio || "No bio available."}</p>
    <button onClick={() => setIsEditingBio(true)}>Edit</button>
    </>
    )}

    </>
}