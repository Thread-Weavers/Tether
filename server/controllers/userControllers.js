const { isAuthorized } = require('../utils/auth-utils');
const User = require('../models/User');

exports.createUser = async (req, res) => {
  const { first_name, last_name, username, email, password } = req.body;
  // TODO: check if username is taken, and if it is what should you return?
  const existingUser = await User.findByUsername(username);
  if (existingUser) res.send(false);

  const user = await User.create(first_name, last_name, username, email, password);
  req.session.userId = user.id;

  const unmatchedUsers = await User.getUnmatchedUsers();
  if (unmatchedUsers.length !== 0) {
    const randomId = Math.round(Math.random() * (unmatchedUsers.length - 0) + 0);
    User.update(user.id, "is_partnered", true);
    User.update(user.id, "partner_id", randomId);
    User.update(randomId, "is_partnered", true);
    User.update(randomId, "partner_id", user.id);
  }

  res.send(user);
};

exports.listUsers = async (req, res) => {
  const users = await User.list();
  res.send(users);
};

exports.showUser = async (req, res) => {
  const { id } = req.params;

  const user = await User.find(id);
  if (!user) return res.sendStatus(404);

  res.send(user);
};

exports.updateUser = async (req, res) => {
  const { target, value } = req.body;
  const { id } = req.params;

  // Not only do users need to be logged in to update a user, they
  // need to be authorized to perform this action for this particular
  // user (users should only be able to change their own profiles)
  if (!isAuthorized(id, req.session)) return res.sendStatus(403);

  const updatedUser = await User.update(id, target, value);
  if (!updatedUser) return res.sendStatus(404)
  res.send(updatedUser);
};

exports.findTether = async (req, res) => {
  const { id } = req.params;

  const user = await User.find(id);
  if (!user) res.sendStatus(404);
  
  const unmatchedUsers = await User.getUnmatchedUsers();
  if (unmatchedUsers.length !== 0) {
    const randomId = Math.round(Math.random() * (unmatchedUsers.length - 0) + 0);
    User.update(id, "is_partnered", true);
    User.update(id, "partner_id", randomId);
    User.update(randomId, "is_partnered", true);
    User.update(randomId, "partner_id", id);
    const partner = await User.find(randomId);
    res.send(partner);
  } else res.sendStatus(409);
}