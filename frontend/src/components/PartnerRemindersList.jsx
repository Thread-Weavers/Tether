import { useState, useEffect } from "react";
import { getAllPublicReminders } from "../adapters/reminder-adapter"; 

export default function PartnerRemindersList({ partner }) {
    const [reminders, setReminders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReminders = async () => {
            if (partner) {
                const fetchedReminders = await getAllPublicReminders(partner.id); 
                console.log('PARTNER REMINDERS FETCHED: ', fetchedReminders);
                setReminders(fetchedReminders);
                setLoading(false);
            }
        };
        fetchReminders();
    }, [partner]);

    if (loading) {
        return <p>Loading Partner Reminders...</p>;
    }

    return (
        <>
            <h3>{partner.username}'s Reminders</h3>
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