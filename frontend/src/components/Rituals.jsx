import { useState, useContext, useEffect } from "react";
import CurrentUserContext from "../contexts/current-user-context";
import { createRitual, getAllRituals, updateRitual, deleteRitual } from "../adapters/ritual-adapter";

export default function Goals() {
    
    //useState to update rituals
    const [rituals, setRituals] = useState([]);
    const [newRitual, setNewRitual] = useState("");
    const [isAddingRitual, setIsAddingRitual] = useState(false);
    const [editRitualIndex, setEditRitualIndex] = useState(null);
    const [editRitualValue, setEditRitualValue] = useState("");
    const [loading, setLoading] = useState(true);
    
    // fetch existing rituals
    useEffect(() => {
        const fetchRituals = async () => {
            const fetchedRituals = await getAllRituals();
            setRituals(fetchedRituals);
            console.log(fetchedRituals);
            setLoading(false);
        };
        fetchRituals();
    }, []);

    // function to handle ritual input
    const handleNewRitualChange = (e) => setNewRitual(e.target.value);

    // fetch POST ritual
    const sendRituals = async() => {
        try {
            const response = await createRitual(newRitual);
            console.log(response[0]);
            setRituals([...rituals, response[0]]);
        } catch (error) {
            console.warn(error.message);
        }
    }

    // add ritual
    const addRitual = () => {
        if(newRitual.trim()){
            sendRituals();
            setNewRitual("");
            setIsAddingRitual(false);
        }
    }
    
    // remove ritual
    const removeRitual = async (index) => {
        const ritualToDelete = rituals[index];
        try {
            await deleteRitual(ritualToDelete.id);
            setRituals(rituals.filter((_, i) => i !== index));
        } catch (error) {
            console.warn(error.message);
        }
    }

    // start editing ritual
    const startEditingRitual = (index) => {
        setEditRitualIndex(index);
        setEditRitualValue(rituals[index].text);
    };

    // save edited ritual
    const saveEditedRitual = async () => {
        const updatedRituals = [...rituals];
        updatedRituals[editRitualIndex].content = editRitualValue;

        try {
            await updateRitual({ id: rituals[editRitualIndex].id, target: "content", value: editRitualValue }); 
            setRituals(updatedRituals);
        } catch (error) {
            console.warn(error.message);
        } finally {
            setEditRitualIndex(null);
            setEditRitualValue("");
        }
    };

    // cancel editing ritual
    const cancelEditRitual = () => {
        setEditRitualIndex(null);
        setEditRitualValue("");
    };

    // toggle complete
    const toggleComplete = (index) => {
        const updatedRituals = [...rituals];
        updatedRituals[index].completed = !updatedRituals[index].completed;
        setRituals(updatedRituals);
    }

    if (loading) {
        return <p>Loading Rituals...</p>;
    }

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
        <li key={index} className={ritual.completed ? "completed" : ""}>
            {editRitualIndex === index ? (
            <>
            <input type="text" value={editRitualValue} onChange={(e) => setEditRitualValue(e.target.value)} />
            <button onClick={saveEditedRitual}>Save</button>
            <button onClick={cancelEditRitual}>Cancel</button>
            <button onClick={() => removeRitual(index)}>Remove</button>
            </>
            ) : (
            <>
            <span className={ritual.completed ? "completed" : ""}>{ritual.content}</span>
            <button onClick={() => startEditingRitual(index)}>Edit</button>
            <button onClick={() => toggleComplete(index)}>
                {ritual.completed ? "Incomplete" : "Complete"}
            </button>
            <button onClick={() => removeRitual(index)}>Remove</button>        
            </>
            )}
        </li>
        ))}
    </ul>
    </>
}