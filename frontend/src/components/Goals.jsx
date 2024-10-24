import { useState, useContext, useEffect } from "react";
import CurrentUserContext from "../contexts/current-user-context";
import { createGoal, getAllGoals, updateGoal, deleteGoal } from "../adapters/goal-adapter";

export default function Goals() {
    //useState to CRUD goals
    const [goals, setGoals] = useState([]);
    const [newGoal, setNewGoal] = useState("");
    const [isAddingGoal, setIsAddingGoal] = useState(false);
    const [editGoalIndex, setEditGoalIndex] = useState(null);
    const [editGoalValue, setEditGoalValue] = useState("");
    const [loading, setLoading] = useState(true);
    const [isPublic, setIsPublic] = useState(false);

    // fetch existing goals
    useEffect(() => {
        const fetchGoals = async () => {
            const fetchedGoals = await getAllGoals();
            setGoals(fetchedGoals);
            console.log(fetchedGoals);
            setLoading(false);
        };
        fetchGoals();
    }, []);

    // function to handle goal
    const handleNewGoalChange = (e) => setNewGoal(e.target.value);

    // fetch POST goal
    const sendGoals = async() => {
        try {
            const response = await createGoal(newGoal, isPublic);
            console.log(response[0]);
            setGoals([...goals, response[0]]);
        } catch (error) {
            console.warn(error.message)
        }
    }

    // add goal
    const addGoal = () => {
        if(newGoal.trim()){
            sendGoals();
            setNewGoal("");
            setIsAddingGoal(false);
        }
    }
    
    // remove goal
    const removeGoal = async (index) => {
        const goalToDelete = goals[index];
        try {
            await deleteGoal(goalToDelete.id);
            setGoals(goals.filter((_, i) => i !== index));
        } catch (error) {
            console.warn(error.message);
        }
    }

    // start editing goal
    const startEditingGoal = (index) => {
        setEditGoalIndex(index);
        setEditGoalValue(goals[index].text);
    };

    // save edited goal
    const saveEditedGoal = async () => {
        const updatedGoals = [...goals];
        updatedGoals[editGoalIndex].content = editGoalValue;
        updatedGoals[editGoalIndex].isPublic = isPublic;

        try {
            await updateGoal({ id: goals[editGoalIndex].id, target: "content", value: editGoalValue }); 
            setGoals(updatedGoals);
        } catch (error) {
            console.warn(error.message);
        } finally {
            setEditGoalIndex(null);
            setEditGoalValue("");
        }
    };

    // cancel editing goal
    const cancelEditGoal = () => {
        setEditGoalIndex(null);
        setEditGoalValue("");
    };

    // toggle complete
    const toggleComplete = (index) => {
        const updatedGoals = [...goals];
        updatedGoals[index].completed = !updatedGoals[index].completed;
        setGoals(updatedGoals);
    }

    if (loading) {
        return <p>Loading Goals...</p>;
    }

    return <>
    <h3>Goals</h3>
    <button onClick={() => setIsAddingGoal(true)}>Add Goal</button>
    {isAddingGoal && (
    <div className="modal">
        <h4>Add a New Goal</h4>
        <input type="text" value={newGoal} onChange={handleNewGoalChange} placeholder="Type your goal here!" />
        <span>{isPublic ? "This goal is public" : "This goal is private"}</span>
        <button onClick={() => setIsPublic(!isPublic)}>
            {isPublic ? "Make Private" : "Make Public"}
        </button>
        <button onClick={addGoal}>Save</button>
        <button onClick={() => setIsAddingGoal(false)}>Cancel</button>
    </div>
    )}

    <ul>
        {goals.map((goal, index) => (
        <li key={index} className={goal.completed ? "completed" : ""}>
            {editGoalIndex === index ? (
            <>
            <input type="text" value={editGoalValue} onChange={(e) => setEditGoalValue(e.target.value)} />
            <button onClick={saveEditedGoal}>Save</button>
            <button onClick={cancelEditGoal}>Cancel</button>
            <button onClick={() => removeGoal(index)}>Remove</button>
            </>
            ) : (
            <>
            <span className={goal.completed ? "completed" : ""}>{goal.content}</span>
            <button onClick={() => startEditingGoal(index)}>Edit</button>
            <button onClick={() => toggleComplete(index)}>
                {goal.completed ? "Incomplete" : "Complete"}
            </button>
            <button onClick={() => removeGoal(index)}>Remove</button>        
            </>
            )}
        </li>
        ))}
    </ul>
    </>
}