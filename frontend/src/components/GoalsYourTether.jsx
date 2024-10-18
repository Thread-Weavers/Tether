import { useState, useContext, useEffect } from "react";
import CurrentUserContext from "../contexts/current-user-context";
import { getAllGoals } from "../adapters/goal-adapter";

export default function GoalsYourTether() {
    const [goals, setGoals] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGoals = async() => {
            const response = await getAllGoals();
            setGoals(response);
            setLoading(false);
        };
        fetchGoals();
    });


    if(loading){
        return <p>Loading Goals...</p>
    }
    
    return <>
    <h3>Goals</h3>
    {goals.length === 0 ? (
        <p>No Goals Found</p>
    ) : (
        <ul>
            {goals.map((goal, index) =>  (
                <li key={index}>{goal.content}</li>
            ))}
        </ul>
    )}
    </>
}