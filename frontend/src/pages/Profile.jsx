import { useContext, useState } from "react";
import CurrentUserContext from "../contexts/current-user-context";

export default function ProfilePage() {

    //current user
    const { currentUser } = useContext(CurrentUserContext);
    
    // useState to update bio
    const [bio, setBio] = useState("");
    const [isEditingBio, setIsEditingBio] = useState(false);

    
    //useState to update goals
    const [goals, setGoals] = useState([]);
    const [newGoal, setNewGoal] = useState("");
    const [isAddingGoal, setIsAddingGoal] = useState(false);

    // useState to handle editing a goal
    const [editGoalIndex, setEditGoalIndex] = useState(null);
    const [editGoalValue, setEditGoalValue] = useState("");
    
    //useState to update reminder
    const [reminders, setReminders] = useState([]);
    const [newReminder, setNewReminder] = useState("");
    const [isAddingReminder, setIsAddingReminder] = useState(false);

    // useState to handle editing a reminder
    const [editReminderIndex, setEditReminderIndex] = useState(null);
    const [editReminderValue, setEditReminderValue] = useState("");

    //useState to update rituals
    const [rituals, setRituals] = useState([]);
    const [newRitual, setNewRitual] = useState("");
    const [isAddingRitual, setIsAddingRitual] = useState(false);

    // useState to handle editing a Ritual
    const [editRitualIndex, setEditRitualIndex] = useState(null);
    const [editRitualValue, setEditRitualValue] = useState("");
    
    // function to click bio 
    const handleBioChange = (e) => setBio(e.target.value);
    
    // function to handle goal
    const handleNewGoalChange = (e) => setNewGoal(e.target.value);
    
    // function to handle reminder
    const handleNewReminderChange = (e) => setNewReminder(e.target.value);

    // function to handle ritual
    const handleNewRitualChange = (e) => setNewRitual(e.target.value);
    
    // add  goal
    const addGoal = () => {
        if(newGoal.trim()){
            setGoals([...goals, newGoal]);
            setNewGoal("");
            setIsAddingGoal(false);
        }
    }
    
    // remove goal
    const removeGoal = (index) => {
        console.log(index);
        setEditGoalIndex(null);
        setEditGoalValue("");
        setGoals(goals.filter((_, i) => i !== index));
    }

    // start editing goal
    const startEditingGoal = (index) => {
        setEditGoalIndex(index);
        setEditGoalValue(goals[index]);
    };

    // save edited goal
    const saveEditedGoal = () => {
        const updatedGoals = [...goals];
        updatedGoals[editGoalIndex] = editGoalValue;
        setGoals(updatedGoals);
        setEditGoalIndex(null);
        setEditGoalValue("");
    };

    // cancel editing goal
    const cancelEditGoal = () => {
        setEditGoalIndex(null);
        setEditGoalValue("");
    };
    
    // add reminder
    const addReminder = () => {
        if (newReminder.trim()) {
            setReminders([...reminders, newReminder]);
            setNewReminder("");
            setIsAddingReminder(false);
        }
    };
    
    // remove reminder
    const removeReminder = (index) => {
        console.log(index);
        setEditReminderIndex(null);
        setEditReminderValue("");
        setReminders(reminders.filter((_, i) => i !== index));
    };

    // start editing reminder
    const startEditingReminder = (index) => {
        setEditReminderIndex(index);
        setEditReminderValue(reminders[index]);
    };

    // save edited reminder
    const saveEditedReminder = () => {
        const updatedReminders = [...reminders];
        updatedReminders[editReminderIndex] = editReminderValue;
        setReminders(updatedReminders);
        setEditReminderIndex(null);
        setEditReminderValue("");
    };


    // cancel editing reminder
    const cancelEditReminder = () => {
        setEditReminderIndex(null);
        setEditReminderValue("");
    };

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
        const updatedRituals = [...Rituals];
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
    <h2>{currentUser?.username}</h2>
    {isEditingBio ? (
        <>
        <textarea value={bio} onChange={handleBioChange} placeholder="Type your bio here!!!"/>
        <button onClick={() => setIsEditingBio(false)}>Save</button>
        <button onClick={() => {setBio(""); setIsEditingBio(false); }}>Cancel</button>
        </>
    ) : (
        <>
        <p>{bio || "No bio available."}</p>
        <button onClick={() => setIsEditingBio(true)}>Edit</button>
        </>
    )}
    
    <h3>Goals</h3>
    <button onClick={() => setIsAddingGoal(true)}>Add Goal</button>
    {isAddingGoal && (
    <div className="modal">
        <h4>Add a New Goal</h4>
        <input type="text" value={newGoal} onChange={handleNewGoalChange} placeholder="Type your goal here!" />
        <button onClick={addGoal}>Save</button>
        <button onClick={() => setIsAddingGoal(false)}>Cancel</button>
    </div>
    )}

    <ul>
        {goals.map((goal, index) => (
        <li key={index}>
            {editGoalIndex === index ? (
            <>
            <input type="text" value={editGoalValue} onChange={(e) => setEditGoalValue(e.target.value)} />
            <button onClick={saveEditedGoal}>Save</button>
            <button onClick={cancelEditGoal}>Cancel</button>
            <button onClick={() => removeGoal(index)}>Remove</button>
            {/* <button onClick={() => console.log(index)}>Remove</button> */}
            </>
            ) : (
            <>
            {goal} 
            <button onClick={() => startEditingGoal(index)}>Edit</button>
            {/* <button onClick={() => removeGoal(index)}>Remove</button> */}
            
            </>
            )}
        </li>
        ))}
    </ul>

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

    <h3>Reminders</h3>
    <button onClick={() => setIsAddingReminder(true)}>Add Reminder</button>
    {isAddingReminder && (
    <div className="modal">
        <h4>Add a New Reminder</h4>
        <input type="text" value={newReminder} onChange={handleNewReminderChange} placeholder="Type your reminder here!" />
        <button onClick={addReminder}>Save</button>
        <button onClick={() => setIsAddingReminder(false)}>Cancel</button>
    </div>
    )}

    <ul>
        {reminders.map((reminder, index) => (
        <li key={index}>
            {editReminderIndex === index ? (
            <>
            <input type="text" value={editReminderValue} onChange={(e) => setEditReminderValue(e.target.value)} />
            <button onClick={saveEditedReminder}>Save</button>
            <button onClick={cancelEditReminder}>Cancel</button>
            <button onClick={() => removeReminder(index)}>Remove</button>
            </>
            ) : (
            <>
            {reminder} 
            <button onClick={() => startEditingReminder(index)}>Edit</button>           
            </>
            )}
        </li>
        ))}
    </ul>
    
    </>
}