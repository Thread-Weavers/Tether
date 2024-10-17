import { useContext, useState } from "react";
import CurrentUserContext from "../contexts/current-user-context";

export default function ProfilePage() {

    //current user
    const { currentUser } = useContext(CurrentUserContext);
    
    // useState to update bio
    const [bio, setBio] = useState("");

    // useState to edit bio
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
    
    // function to click bio 
    const handleBioChange = (e) => setBio(e.target.value);
    
    // function to handle goal
    const handleNewGoalChange = (e) => setNewGoal(e.target.value);
    
    // function to handle reminder
    const handleNewReminderChange = (e) => setNewReminder(e.target.value);
    
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
        }
    };
    
    // remove reminder
    const removeReminder = (index) => {
        setReminders(reminders.filter((_, i) => i !== index));
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

    <h3>Reminder</h3>
    <ul>
        {reminders.map((reminder, index) => (
        <li key={index}>
            {reminder} <button onClick={() => removeReminder(index)}>Remove</button>
        </li>
        ))}
    </ul>
    
    <input type="text" value={newReminder} onChange={handleNewReminderChange} placeholder="Add a new reminder!"/>
    <button onClick={addReminder}>Add Reminder</button>
    
    </>
}