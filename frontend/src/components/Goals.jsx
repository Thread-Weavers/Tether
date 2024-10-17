import { useState, useContext } from "react";
import CurrentUserContext from "../contexts/current-user-context";

export default function Goals() {
    
    //useState to update goals
    const [goals, setGoals] = useState([]);
    const [newGoal, setNewGoal] = useState("");
    const [isAddingGoal, setIsAddingGoal] = useState(false);

    // useState to handle editing a goal
    const [editGoalIndex, setEditGoalIndex] = useState(null);
    const [editGoalValue, setEditGoalValue] = useState("");

    // function to handle goal
    const handleNewGoalChange = (e) => setNewGoal(e.target.value);

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

    return <>
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
            </>
            ) : (
            <>
            {goal} 
            <button onClick={() => startEditingGoal(index)}>Edit</button>        
            </>
            )}
        </li>
        ))}
    </ul>
    </>
}