import { useState, useEffect } from "react";
import { getAllPublicGoals } from "../adapters/goal-adapter";

export default function GoalsList() {
    const [goals, setGoals] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch existing goals
    useEffect(() => {
        const fetchGoals = async () => {
            const fetchedGoals = await getAllPublicGoals();
            console.log('FETCHED: ', fetchedGoals)
            setGoals(fetchedGoals);
            setLoading(false);
        };
        fetchGoals();
    }, []);

    // Toggle complete
    const toggleComplete = (index) => {
        const updatedGoals = [...goals];
        updatedGoals[index].completed = !updatedGoals[index].completed;
        setGoals(updatedGoals);
    }

    if (loading) {
        return <p>Loading Goals...</p>;
    }

    return (
        <>
            <h3>Goals</h3>
            <ul>
                {goals.map((goal, index) => (
                    <li key={index} className={goal.completed ? "completed" : ""}>
                        <span>{goal.content}</span>
                        <button onClick={() => toggleComplete(index)}>
                            {goal.completed ? "Incomplete" : "Complete"}
                        </button>
                    </li>
                ))}
            </ul>
        </>
    );
}