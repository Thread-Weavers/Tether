import { useState, useEffect, useContext } from "react";
import CurrentUserContext from "../contexts/current-user-context";
import { getAllPublicGoals } from "../adapters/goal-adapter";

export default function GoalsList() {
    const { currentUser } = useContext(CurrentUserContext);
    const [goals, setGoals] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch existing goals
    useEffect(() => {
        const fetchGoals = async () => {
            const fetchedGoals = await getAllPublicGoals(currentUser?.id);
            console.log('FETCHED: ', fetchedGoals)
            setGoals(fetchedGoals);
            setLoading(false);
        };
        if (currentUser) fetchGoals();
    }, [currentUser]);

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