import { useState, useContext, useEffect } from "react";
import CurrentUserContext from "../contexts/current-user-context";
import { createReminder, getAllReminders, updateReminder, deleteReminder } from "../adapters/reminder-adapter";

export default function Reminders() {
    const { currentUser } = useContext(CurrentUserContext);
    // useState to manage reminders
    const [reminders, setReminders] = useState([]);
    const [newReminder, setNewReminder] = useState("");
    const [isAddingReminder, setIsAddingReminder] = useState(false);
    const [editReminderIndex, setEditReminderIndex] = useState(null);
    const [editReminderValue, setEditReminderValue] = useState("");
    const [loading, setLoading] = useState(true);
    const [isPublic, setIsPublic] = useState(false);

    // Fetch existing reminders
    useEffect(() => {
        const fetchReminders = async () => {
            const fetchedReminders = await getAllReminders(currentUser?.id);
            setReminders(fetchedReminders);
            setLoading(false);
        };
        if (currentUser) fetchReminders();
    }, [currentUser]);

    // Handle new reminder input change
    const handleNewReminderChange = (e) => setNewReminder(e.target.value);

    // Create reminder
    const sendReminders = async () => {
        try {
            const response = await createReminder(newReminder, isPublic);
            console.log(response[0]);
            setReminders([...reminders, response[0]]);
        } catch (error) {
            console.warn(error.message);
        }
    };

    // Add reminder
    const addReminder = () => {
        if (newReminder.trim()) {
            sendReminders();
            setNewReminder("");
            setIsAddingReminder(false);
        }
    };

    // Remove reminder
    const removeReminder = async (index) => {
        const reminderToDelete = reminders[index];
        try {
            await deleteReminder(reminderToDelete.id);
            setReminders(reminders.filter((_, i) => i !== index));
        } catch (error) {
            console.warn(error.message);
        }
    };

    // Start editing reminder
    const startEditingReminder = (index) => {
        setEditReminderIndex(index);
        setEditReminderValue(reminders[index].text);
    };

    // Save edited reminder
    const saveEditedReminder = async () => {
        const updatedReminders = [...reminders];
        updatedReminders[editReminderIndex].content = editReminderValue;
        updatedReminders[editReminderIndex].isPublic = isPublic;

        try {
            await updateReminder({ id: reminders[editReminderIndex].id, target: "content", value: editReminderValue });
            setReminders(updatedReminders);
        } catch (error) {
            console.warn(error.message);
        } finally {
            setEditReminderIndex(null);
            setEditReminderValue("");
        }
    };

    // Cancel editing reminder
    const cancelEditReminder = () => {
        setEditReminderIndex(null);
        setEditReminderValue("");
    };

    // Toggle complete
    const toggleComplete = (index) => {
        const updatedReminders = [...reminders];
        updatedReminders[index].completed = !updatedReminders[index].completed;
        setReminders(updatedReminders);
    };

    if (loading) {
        return <p>Loading Reminders...</p>;
    }

    return <>
    <h3>Reminders</h3>
    <button onClick={() => setIsAddingReminder(true)}>Add Reminder</button>
    {isAddingReminder && (
    <div className="modal">
        <h4>Add a New Reminder</h4>
        <input type="text" value={newReminder} onChange={handleNewReminderChange} placeholder="Type your reminder here!" />
        <span>{isPublic ? "This reminder is public" : "This reminder is private"}</span>
        <button onClick={() => setIsPublic(!isPublic)}>
            {isPublic ? "Make Private" : "Make Public"}
        </button>
        <button onClick={addReminder}>Save</button>
        <button onClick={() => setIsAddingReminder(false)}>Cancel</button>
    </div>
    )}
    
    <ul>
        {reminders.map((reminder, index) => (
        <li key={index} className={reminder.completed ? "completed" : ""}>
            {editReminderIndex === index ? (
            <>
            <input type="text" value={editReminderValue} onChange={(e) => setEditReminderValue(e.target.value)} />
            <button onClick={saveEditedReminder}>Save</button>
            <button onClick={cancelEditReminder}>Cancel</button>
            <button onClick={() => removeReminder(index)}>Remove</button>
            </>
            ) : (
            <>
            <span className={reminder.completed ? "completed" : ""}>{reminder.content}</span>
            <button onClick={() => startEditingReminder(index)}>Edit</button>
            <button onClick={() => toggleComplete(index)}>
                {reminder.completed ? "Incomplete" : "Complete"}
            </button>
            <button onClick={() => removeReminder(index)}>Remove</button>
            </>
            )}
        </li>
        ))}
    </ul>
    </>
}