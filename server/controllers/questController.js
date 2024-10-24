const { isAuthorized } = require('../utils/auth-utils');
const Quest = require('../models/Quest');

exports.saveData = async (req, res) => {
    const { answers } = req.body;
    const userId = req.session.userId;
  
    if (!isAuthorized(userId, req.session)) return res.sendStatus(403);
  
    const savedAnswers = await Quest.create(answers.map((obj) => obj.answer));
    res.send(savedAnswers);
}
