import { useState, useContext, useEffect } from "react";
import CurrentUserContext from "../contexts/current-user-context";
import { createRitual, getAllRituals, updateRitual, deleteRitual } from "../adapters/ritual-adapter";

export default function Goals() {
    const { currentUser } = useContext(CurrentUserContext);
    //useState to update rituals
    const [rituals, setRituals] = useState([]);
    const [newRitual, setNewRitual] = useState("");
    const [isAddingRitual, setIsAddingRitual] = useState(false);
    const [editRitualIndex, setEditRitualIndex] = useState(null);
    const [editRitualValue, setEditRitualValue] = useState("");
    const [loading, setLoading] = useState(true);
    const [isPublic, setIsPublic] = useState(false);
    
    // fetch existing rituals
    useEffect(() => {
        const fetchRituals = async () => {
            const fetchedRituals = await getAllRituals(currentUser?.id);
            setRituals(fetchedRituals);
            setLoading(false);
        };
        if (currentUser) fetchRituals();
    }, [currentUser]);

    // function to handle ritual input
    const handleNewRitualChange = (e) => setNewRitual(e.target.value);

    // fetch POST ritual
    const sendRituals = async() => {
        try {
            const response = await createRitual(newRitual, isPublic);
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
        updatedRituals[editRitualIndex].isPublic = isPublic;

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
    <div className="ritualsContainer">
      <h3 className="ritualsHeading">Rituals</h3>
      <button className="addRitualButton" onClick={() => setIsAddingRitual(true)}>Add Ritual</button>
      {isAddingRitual && (
        <div className="modal">
          <h4 className="modalTitle">Add a New Ritual</h4>
          <input 
            type="text" 
            className="ritualInput" 
            value={newRitual} 
            onChange={handleNewRitualChange} 
            placeholder="Type your ritual here!" 
          />
          <span className="ritualPrivacyText">{isPublic ? "This ritual is public" : "This ritual is private"}</span>
          <button className="togglePrivacyButton" onClick={() => setIsPublic(!isPublic)}>
            {isPublic ? "Make Private" : "Make Public"}
          </button>
          <button className="saveRitualButton" onClick={addRitual}>Save</button>
          <button className="cancelButton" onClick={() => setIsAddingRitual(false)}>Cancel</button>
        </div>
      )}
  
      <ul className="ritualsList">
        {rituals.map((ritual, index) => (
          <li key={index} className={`ritualItem ${ritual.completed ? "completed" : ""}`}>
            {editRitualIndex === index ? (
              <>
                <input 
                  type="text" 
                  className="ritualInput" 
                  value={editRitualValue} 
                  onChange={(e) => setEditRitualValue(e.target.value)} 
                />
                <button className="saveEditButton" onClick={saveEditedRitual}>Save</button>
                <button className="cancelEditButton" onClick={cancelEditRitual}>Cancel</button>
                <button className="removeButton" onClick={() => removeRitual(index)}>Remove</button>
              </>
            ) : (
              <>
                <span className={`ritualContent ${ritual.completed ? "completed" : ""}`}>{ritual.content}</span>
                <button className="editButton" onClick={() => startEditingRitual(index)}>Edit</button>
                <button className="toggleCompleteButton" onClick={() => toggleComplete(index)}>
                  {ritual.completed ? "Incomplete" : "Complete"}
                </button>
                <button className="removeButton" onClick={() => removeRitual(index)}>Remove</button>        
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  </>
  
}