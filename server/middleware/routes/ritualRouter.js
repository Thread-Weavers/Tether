const express = require('express');
const ritualControllers = require('../../controllers/ritualControllers');
const checkAuthentication = require('../checkAuthentication');

const ritualRouter = express.Router();

ritualRouter.post('/', checkAuthentication, ritualControllers.createRitual);
ritualRouter.get('/', checkAuthentication, ritualControllers.listRituals);
ritualRouter.get('/:id', checkAuthentication, ritualControllers.showRitual);
ritualRouter.patch('/:id', checkAuthentication, ritualControllers.updateRitual);
ritualRouter.delete('/:id', checkAuthentication, ritualControllers.deleteRitual);

module.exports = ritualRouter;