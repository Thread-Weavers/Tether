import { useState, useEffect, useContext } from "react";
import CurrentUserContext from "../contexts/current-user-context";
import { getAllPublicReminders } from "../adapters/reminder-adapter"; 

export default function PartnerRemindersList() {
    const { currentUser } = useContext(CurrentUserContext);
    const [reminders, setReminders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReminders = async () => {
            const fetchedReminders = await getAllPublicReminders(currentUser?.partner_id); 
            console.log('PARTNER REMINDERS FETCHED: ', fetchedReminders);
            setReminders(fetchedReminders);
            setLoading(false);
        };
        if (currentUser) fetchReminders();
    }, [currentUser]);

    if (loading) {
        return <p>Loading Partner Reminders...</p>;
    }

    return (
        <>
            <h3>Reminders</h3>
            <ul>
                {reminders.map((reminder, index) => (
                    <li key={index} className={reminder.completed ? "completed" : ""}>
                        <span>{reminder.content}</span>
                    </li>
                ))}
            </ul>
        </>
    );
}