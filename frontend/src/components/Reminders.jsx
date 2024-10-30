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
    <div className="ritualsContainer">
      <h3 className="ritualsHeading">Reminders</h3>
      <button className="addRitualButton" onClick={() => setIsAddingReminder(true)}>Add Reminder</button>
      {isAddingReminder && (
        <div className="modal">
          <h4 className="modalTitle">Add a New Reminder</h4>
          <input 
            type="text" 
            className="ritualInput" 
            value={newReminder} 
            onChange={handleNewReminderChange} 
            placeholder="Type your reminder here!" 
          />
          <span className="ritualPrivacyText">{isPublic ? "This reminder is public" : "This reminder is private"}</span>
          <button className="togglePrivacyButton" onClick={() => setIsPublic(!isPublic)}>
            {isPublic ? "Make Private" : "Make Public"}
          </button>
          <button className="saveRitualButton" onClick={addReminder}>Save</button>
          <button className="cancelButton" onClick={() => setIsAddingReminder(false)}>Cancel</button>
        </div>
      )}
  
      <ul className="ritualsList">
        {reminders.map((reminder, index) => (
          <li key={index} className={`ritualItem ${reminder.completed ? "completed" : ""}`}>
            {editReminderIndex === index ? (
              <>
                <input 
                  type="text" 
                  className="ritualInput" 
                  value={editReminderValue} 
                  onChange={(e) => setEditReminderValue(e.target.value)} 
                />
                <button className="saveEditButton" onClick={saveEditedReminder}>Save</button>
                <button className="cancelEditButton" onClick={cancelEditReminder}>Cancel</button>
                <button className="removeButton" onClick={() => removeReminder(index)}>Remove</button>
              </>
            ) : (
              <>
                <span className={`ritualContent ${reminder.completed ? "completed" : ""}`}>{reminder.content}</span>
                <button className="editButton" onClick={() => startEditingReminder(index)}>Edit</button>
                <button className="toggleCompleteButton" onClick={() => toggleComplete(index)}>
                  {reminder.completed ? "Incomplete" : "Complete"}
                </button>
                <button className="removeButton" onClick={() => removeReminder(index)}>Remove</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  </>
  
}