import { useState, useContext } from "react";
import CurrentUserContext from "../contexts/current-user-context";
import { createReminder } from "../adapters/reminder-adapter";

export default function Goals() {
    
    //useState to update reminder
    const [reminders, setReminders] = useState([]);
    const [newReminder, setNewReminder] = useState("");
    const [isAddingReminder, setIsAddingReminder] = useState(false);

    // useState to handle editing a reminder
    const [editReminderIndex, setEditReminderIndex] = useState(null);
    const [editReminderValue, setEditReminderValue] = useState("");

    // function to handle reminder
    const handleNewReminderChange = (e) => setNewReminder(e.target.value);

    // Reminders POST
    const sendReminders = async() => {
        try {
            const response = await createReminder(newReminder)
            console.log(response);
        } catch (error) {
            console.warn(error.message)
        }
    }

    // add reminder
    const addReminder = () => {
        if (newReminder.trim()) {
            setReminders([...reminders, { text: newReminder, completed: false }]);
            setNewReminder("");
            setIsAddingReminder(false);
            sendReminders();
        }
    };
    
    // remove reminder
    const removeReminder = (index) => {
        setEditReminderIndex(null);
        setEditReminderValue("");
        setReminders(reminders.filter((_, i) => i !== index));
    };

    // start editing reminder
    const startEditingReminder = (index) => {
        setEditReminderIndex(index);
        setEditReminderValue(reminders[index].text);
    };

    // save edited reminder
    const saveEditedReminder = () => {
        const updatedReminders = [...reminders];
        updatedReminders[editReminderIndex].text = editReminderValue;
        setReminders(updatedReminders);
        setEditReminderIndex(null);
        setEditReminderValue("");
    };

    // cancel editing reminder
    const cancelEditReminder = () => {
        setEditReminderIndex(null);
        setEditReminderValue("");
    };

    // toggle complete
    const toggleComplete = (index) => {
        const updatedReminders = [...reminders];
        updatedReminders[index].completed = !updatedReminders[index].completed;
        setReminders(updatedReminders);
    }

    return <>
    <h3>Reminders</h3>
    <button onClick={() => setIsAddingReminder(true)}>Add Reminder</button>
    {isAddingReminder && (
    <div className="modal">
        <h4>Add a New Reminder</h4>
        <input type="text" value={newReminder} onChange={handleNewReminderChange} placeholder="Type your reminder here!" />
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
            <span className={reminder.completed ? "completed" : ""}>{reminder.text}</span>
            <button onClick={() => startEditingGoal(index)}>Edit</button>
            <button onClick={() => toggleComplete(index)}>
                {reminder.completed ? "Incomplete" : "Complete"}
            </button> 
            <button onClick={() => startEditingReminder(index)}>Edit</button>           
            </>
            )}
        </li>
        ))}
    </ul>
    </>
}