import { useState, useEffect } from "react";
import { getAllReminders } from "../adapters/reminder-adapter";

export default function RemindersList() {
    const [reminders, setReminders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReminders = async () => {
            const fetchedReminders = await getAllReminders();
            const publicReminders = fetchedReminders.filter(reminder => reminder.is_public);
            setReminders(publicReminders);
            setLoading(false);
        };
        fetchReminders();
    }, []);

    const toggleComplete = (index) => {
        const updatedReminders = [...reminders];
        updatedReminders[index].completed = !updatedReminders[index].completed;
        setReminders(updatedReminders);
    };

    if (loading) {
        return <p>Loading Reminders...</p>;
    }

    return (
        <>
            <h3>Reminders</h3>
            <ul>
                {reminders.map((reminder, index) => (
                    <li key={index} className={reminder.completed ? "completed" : ""}>
                        <span>{reminder.content}</span>
                        <button onClick={() => toggleComplete(index)}>
                            {reminder.completed ? "Incomplete" : "Complete"}
                        </button>
                    </li>
                ))}
            </ul>
        </>
    );
}