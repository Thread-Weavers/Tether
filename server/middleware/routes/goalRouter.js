const express = require('express');
const goalControllers = require('../../controllers/goalControllers');
const checkAuthentication = require('../checkAuthentication');

const goalRouter = express.Router();

goalRouter.post('/', checkAuthentication, goalControllers.createGoal);
goalRouter.get('/:userId', checkAuthentication, goalControllers.listGoals);
goalRouter.get('/public/:userId', checkAuthentication, goalControllers.listPublicGoals);
goalRouter.get('/:id', checkAuthentication, goalControllers.showGoal);
goalRouter.patch('/:id', checkAuthentication, goalControllers.updateGoal);
goalRouter.delete('/:id', checkAuthentication, goalControllers.deleteGoal);

module.exports = goalRouter;