const { isAuthorized } = require('../utils/auth-utils');
const Ritual = require('../models/Ritual');

exports.createRitual = async (req, res) => {
    const { content, isPublic } = req.body;
    const userId = req.session.userId;
  
    if (!isAuthorized(userId, req.session)) return res.sendStatus(403);
  
    const newRitual = await Ritual.create(userId, content, isPublic);
    res.send(newRitual);
  }

exports.listRituals = async (req, res) => {
    const userId = req.session.userId;
    if (!isAuthorized(userId, req.session)) return res.sendStatus(403);
    const userRituals = await Ritual.list(userId);
    res.send(userRituals);
}

exports.showRitual = async (req, res) => {
    const { id } = req.params;
    const userId = req.session.userId;

    if (!isAuthorized(userId, req.session)) return res.sendStatus(403);

    const ritual = await Ritual.find(id);
    if (!ritual) return res.sendStatus(404);

    res.send(ritual);
}

exports.updateRitual = async (req, res) => {
    const { target, value } = req.body;
    const { id } = req.params;
    const userId = req.session.userId;

    if (!isAuthorized(userId, req.session)) return res.sendStatus(403);

    const updatedRitual = await Ritual.update(id, target, value);
    res.send(updatedRitual);
}

exports.deleteRitual = async (req, res) => {
    const { id } = req.params;
    const userId = req.session.userId;

    if (!isAuthorized(userId, req.session)) return res.sendStatus(403);

    Ritual.delete(id);
    res.sendStatus(204);
}
