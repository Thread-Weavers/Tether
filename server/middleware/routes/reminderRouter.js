const express = require('express');
const reminderControllers = require('../../controllers/reminderControllers');
const checkAuthentication = require('../checkAuthentication');

const reminderRouter = express.Router();

reminderRouter.post('/', checkAuthentication, reminderControllers.createReminder);
reminderRouter.get('/:userId', checkAuthentication, reminderControllers.listReminders);
reminderRouter.get('/public/:userId', checkAuthentication, reminderControllers.listPublicReminders);
reminderRouter.get('/:id', checkAuthentication, reminderControllers.showReminder);
reminderRouter.patch('/:id', checkAuthentication, reminderControllers.updateReminder);
reminderRouter.delete('/:id', checkAuthentication, reminderControllers.deleteReminder);

module.exports = reminderRouter;