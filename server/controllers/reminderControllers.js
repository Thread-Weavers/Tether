const { isAuthorized } = require('../utils/auth-utils');
const Reminder = require('../models/Reminder');

exports.createReminder = async (req, res) => {
    const { content, isPublic } = req.body;
    const userId = req.session.userId;
  
    if (!isAuthorized(userId, req.session)) return res.sendStatus(403);
  
    const newReminder = await Reminder.create(userId, content, isPublic ? isPublic : false);
    res.send(newReminder);
  }

exports.listReminders = async (req, res) => {
    const userId = req.session.userId;
    if (!isAuthorized(userId, req.session)) return res.sendStatus(403);
    const userReminders = await Reminder.list(userId);
    res.send(userReminders);
}

exports.updateReminder = async (req, res) => {
    const { target, value } = req.body;
    const { id } = req.params;
    const userId = req.session.userId;

    if (!isAuthorized(userId, req.session)) return res.sendStatus(403);

    const updatedReminder = await Reminder.update(id, target, value);
    res.send(updatedReminder);
}

exports.deleteReminder = async (req, res) => {
    const { id } = req.params;
    const userId = req.session.userId;

    if (!isAuthorized(userId, req.session)) return res.sendStatus(403);

    Reminder.delete(id);
    res.sendStatus(204);
}

exports.showReminder = async (req, res) => {
    const { id } = req.params;
    const userId = req.session.userId;

    if (!isAuthorized(userId, req.session)) return res.sendStatus(403);

    const reminder = await Reminder.find(id);
    if (!reminder) return res.sendStatus(404);

    res.send(reminder);
}