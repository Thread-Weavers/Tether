import { useState, useEffect } from "react";
import { getAllPublicGoals } from "../adapters/goal-adapter";

export default function PartnerGoalsList({ partner }) {
    const [goals, setGoals] = useState([]);
    const [loading, setLoading] = useState(true);

    console.log(partner.id);
    useEffect(() => {
        const fetchGoals = async () => {
            if (partner) {
                const fetchedGoals = await getAllPublicGoals(partner.id);
                console.log('PARTNER GOALS FETCHED: ', fetchedGoals);
                setGoals(fetchedGoals);
                setLoading(false);
            }
        };
        fetchGoals();
    }, [partner]);

    if (loading) {
        return <p>Loading Partner Goals...</p>;
    }

    return (
        <>
            <h3>{partner.username}'s Goals</h3>
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