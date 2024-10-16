import { useState, useEffect } from "react";
import CurrentUserContext from "../contexts/current-user-context";

export default function ProfilePage() {

    //current user
    const { currentUser } = useContext(CurrentUserContext);
    
    // useState to update bio
    const [bio, setBio] = useState("");
    
    //useState to update goals
    const [goals, setGoals] = useState([]);
    const [newGoal, setNewGoal] = useState("");
    
    //useState to update reminder
    const [reminders, setReminders] = useState([]);
    const [newReminder, setNewReminder] = useState("");
    
    // function to click bio 
    const handleBioChange = (e) => {
        setBio(e.target.value);
    }
    
    // function to handle goal
    const handleNewGoalChange = (e) => {
        setNewGoal(e.target.value);
    }
    
    // function to handle reminder
    const handleNewReminderChange = (e) => {
        setNewReminder(e.target.value);
    };
    
    // add  goal
    const addGoal = () => {
        if(newGoal.trim()){
            setGoals([...goals, newGoal]);
            setNewGoal("");
        }
    }
    
    // remove goal
    const removeGoal = (index) => {
        setGoals(goals.filter((_, i) => i !== index));
    }
    
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
    <h2>{currentUser.username}</h2>
    <textarea value={bio} onChange={handleBioChange} placeholder="Type your bio here!!!"/>
    
    <h3>Goals</h3>
    <ul>
        {goals.map((goal, index) => (
        <li key={index}>
            {goal} <button onClick={() => removeGoal(index)}>Remove</button>
            </li>
        ))}
    </ul>
    
    <input type="text" value={newGoal} onChange={handleNewGoalChange} placeholder="Add a new goal!"/>
    <button onClick={addGoal}>Add Goal</button>
        
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