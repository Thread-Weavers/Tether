const { isAuthorized } = require('../utils/auth-utils');
const Ritual = require('../models/Ritual');

exports.createRitual = async (req, res) => {
    const { content, isPublic } = req.body;
    const { id } = req.params;
  
    if (!isAuthorized(id, req.session)) return res.sendStatus(403);
  
    const newRitual = await Ritual.create(id, content, isPublic);
    res.send(newRitual);
  }

exports.listRituals = async (req, res) => {
    const { id } = req.params;
    if (!isAuthorized(id, req.session)) return res.sendStatus(403);
    const userRituals = await Ritual.list(id);
    res.send(userRituals);
}

exports.showRitual = async (req, res) => {
    const { id, ritualId } = req.params;

    if (!isAuthorized(id, req.session)) return res.sendStatus(403);

    const ritual = await Ritual.find(ritualId);
    if (!ritual) return res.sendStatus(404);

    res.send(ritual);
}

exports.updateRitual = async (req, res) => {
    const { target, value } = req.body;
    const { id, ritualId } = req.params;

    if (!isAuthorized(id, req.session)) return res.sendStatus(403);

    const updatedRitual = await Ritual.update(ritualId, target, value);
    res.send(updatedRitual);
}

exports.deleteRitual = async (req, res) => {
    const { id, ritualId } = req.params;

    if (!isAuthorized(id, req.session)) return res.sendStatus(403);

    Ritual.delete(ritualId);
    res.sendStatus(410);
}
