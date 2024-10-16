const { isAuthorized } = require('../utils/auth-utils');
const Reminder = require('../models/Reminder');

exports.createReminder = async (req, res) => {
    const { content, isPublic } = req.body;
    const { id } = req.params;
  
    if (!isAuthorized(id, req.session)) return res.sendStatus(403);
  
    const newReminder = await Reminder.create(id, content, isPublic);
    res.send(newReminder);
  }

exports.listReminders = async (req, res) => {
    const { id } = req.params;
    if (!isAuthorized(id, req.session)) return res.sendStatus(403);
    const userReminders = await Reminder.list(id);
    res.send(userReminders);
}

exports.updateReminder = async (req, res) => {
    const { target, value } = req.body;
    const { id, reminderId } = req.params;

    if (!isAuthorized(id, req.session)) return res.sendStatus(403);

    const updatedReminder = await Reminder.update(reminderId, target, value);
    res.send(updatedReminder);
}

exports.deleteReminder = async (req, res) => {
    const { id, reminderId } = req.params;

    if (!isAuthorized(id, req.session)) return res.sendStatus(403);

    Reminder.delete(reminderId);
    res.sendStatus(410);
}

exports.showReminder = async (req, res) => {
    const { id, reminderId } = req.params;

    if (!isAuthorized(id, req.session)) return res.sendStatus(403);

    const reminder = await Reminder.find(reminderId);
    if (!reminder) return res.sendStatus(404);

    res.send(reminder);
}