const { isAuthorized } = require('../utils/auth-utils');
const Goal = require('../models/Goal');

exports.createGoal = async (req, res) => {
    const { content, isPublic } = req.body;
    const userId = req.session.userId;
  
    if (!isAuthorized(userId, req.session)) return res.sendStatus(403);
  
    const newGoal = await Goal.create(userId, content, isPublic ? isPublic : false);
    res.send(newGoal);
  }

exports.listGoals = async (req, res) => {
    const { userId } = req.params;
    console.log(userId);
    if (!isAuthorized(userId, req.session)) return res.sendStatus(403);
    const userGoals = await Goal.list(userId);
    res.send(userGoals);
}

exports.listPublicGoals = async (req, res) => {
    const { userId } = req.params;
    console.log(userId);
    // if (!isAuthorized(userId, req.session)) return res.sendStatus(403);
    const userGoals = await Goal.listPublics(userId);
    res.send(userGoals);
}

exports.showGoal = async (req, res) => {
    const { id } = req.params;
    const userId = req.session.userId;

    if (!isAuthorized(userId, req.session)) return res.sendStatus(403);

    const goal = await Goal.find(id);
    if (!goal) return res.sendStatus(404);

    res.send(goal);
}

exports.updateGoal = async (req, res) => {
    const { target, value } = req.body;
    const { id } = req.params;
    const userId = req.session.userId;

    if (!isAuthorized(userId, req.session)) return res.sendStatus(403);

    const updatedGoal = await Goal.update(id, target, value);
    res.send(updatedGoal);
}

exports.deleteGoal = async (req, res) => {
    const { id } = req.params;
    const userId = req.session.userId;

    if (!isAuthorized(userId, req.session)) return res.sendStatus(403);

    Goal.delete(id);
    res.sendStatus(204);
}
