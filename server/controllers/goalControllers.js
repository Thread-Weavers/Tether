const { isAuthorized } = require('../utils/auth-utils');
const Goal = require('../models/Goal');

exports.addGoal = async (req, res) => {
    const { content, isPublic } = req.body;
    const { id } = req.params;
  
    if (!isAuthorized(id, req.session)) return res.sendStatus(403);
  
    const newGoal = await Goal.create(id, content, isPublic);
    res.send(newGoal);
  }

exports.listGoals = async (req, res) => {
    const { id } = req.params;
    if (!isAuthorized(id, req.session)) return res.sendStatus(403);
    const userGoals = await Goal.list(id);
    res.send(userGoals);
}

exports.updateGoal = async (req, res) => {
    const { target, value } = req.body;
    const { id, goalId } = req.params;

    if (!isAuthorized(id, req.session)) return res.sendStatus(403);

    const updatedGoal = await Goal.update(goalId, target, value);
    res.send(updatedGoal);
}

exports.deleteGoal = async (req, res) => {
    const { id, goalId } = req.params;

    if (!isAuthorized(id, req.session)) return res.sendStatus(403);

    Goal.delete(goalId);
    res.sendStatus(410);
}