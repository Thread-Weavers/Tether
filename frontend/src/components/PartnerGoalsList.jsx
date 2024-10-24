import { useState, useEffect, useContext } from "react";
import CurrentUserContext from "../contexts/current-user-context";
import { getAllPublicGoals } from "../adapters/goal-adapter";

export default function PartnerGoalsList() {
    const { currentUser } = useContext(CurrentUserContext);
    const [goals, setGoals] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGoals = async () => {
            const fetchedGoals = await getAllPublicGoals(currentUser?.partner_id);
            console.log('PARTNER GOALS FETCHED: ', fetchedGoals);
            setGoals(fetchedGoals);
            setLoading(false);
        };
        if (currentUser) fetchGoals();
    }, [currentUser]);

    if (loading) {
        return <p>Loading Partner Goals...</p>;
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