const { isAuthorized } = require('../utils/auth-utils');
const Quest = require('../models/Quest');
const User = require('../models/User');

exports.saveData = async (req, res) => {
    const answers = req.body;
    const userId = req.session.userId;
    console.log(req.body);
    if (!isAuthorized(userId, req.session)) return res.sendStatus(403);
  
    const savedAnswers = await Quest.create(...answers);
    const updatedUser = await User.update(userId, "quest_flag", true);
    console.log(updatedUser);
    res.send(savedAnswers);
}
