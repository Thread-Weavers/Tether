const { isAuthorized } = require('../utils/auth-utils');
const Quest = require('../models/Quest');
const User = require('../models/User');

exports.saveData = async (req, res) => {
    const answers = req.body;
    const userId = req.session.userId;
  
    if (!isAuthorized(userId, req.session)) return res.sendStatus(403);
  
    const savedAnswers = await Quest.create(userId, ...answers);
    const updatedUser = await User.update(userId, "quest_flag", true);
}
