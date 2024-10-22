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
                    </li>
                ))}
            </ul>
        </>
    );
}