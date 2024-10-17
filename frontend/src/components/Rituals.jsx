import { useState, useContext } from "react";
import CurrentUserContext from "../contexts/current-user-context";

export default function Goals() {
    
    //useState to update rituals
    const [rituals, setRituals] = useState([]);
    const [newRitual, setNewRitual] = useState("");
    const [isAddingRitual, setIsAddingRitual] = useState(false);

    // useState to handle editing a Ritual
    const [editRitualIndex, setEditRitualIndex] = useState(null);
    const [editRitualValue, setEditRitualValue] = useState("");
    
    // function to handle ritual
    const handleNewRitualChange = (e) => setNewRitual(e.target.value);

    // add  ritual
    const addRitual = () => {
        if(newRitual.trim()){
            setRituals([...rituals, newRitual]);
            setNewRitual("");
            setIsAddingRitual(false);
        }
    }
    
    // remove ritual
    const removeRitual = (index) => {
        console.log(index);
        setEditRitualIndex(null);
        setEditRitualValue("");
        setRituals(rituals.filter((_, i) => i !== index));
    }

    // start editing ritual
    const startEditingRitual = (index) => {
        setEditRitualIndex(index);
        setEditRitualValue(rituals[index]);
    };

    // save edited ritual
    const saveEditedRitual = () => {
        const updatedRituals = [...rituals];
        updatedRituals[editRitualIndex] = editRitualValue;
        setRituals(updatedRituals);
        setEditRitualIndex(null);
        setEditRitualValue("");
    };

    // cancel editing ritual
    const cancelEditRitual = () => {
        setEditRitualIndex(null);
        setEditRitualValue("");
    };


    return <>
    <h3>Rituals</h3>
    <button onClick={() => setIsAddingRitual(true)}>Add Ritual</button>
    {isAddingRitual && (
    <div className="modal">
        <h4>Add a New Ritual</h4>
        <input type="text" value={newRitual} onChange={handleNewRitualChange} placeholder="Type your ritual here!" />
        <button onClick={addRitual}>Save</button>
        <button onClick={() => setIsAddingRitual(false)}>Cancel</button>
    </div>
    )}

    <ul>
        {rituals.map((ritual, index) => (
        <li key={index}>
            {editRitualIndex === index ? (
            <>
            <input type="text" value={editRitualValue} onChange={(e) => setEditRitualValue(e.target.value)} />
            <button onClick={saveEditedRitual}>Save</button>
            <button onClick={cancelEditRitual}>Cancel</button>
            <button onClick={() => removeRitual(index)}>Remove</button>
            </>
            ) : (
            <>
            {ritual} 
            <button onClick={() => startEditingRitual(index)}>Edit</button>           
            </>
            )}
        </li>
        ))}
    </ul>
    </>
}