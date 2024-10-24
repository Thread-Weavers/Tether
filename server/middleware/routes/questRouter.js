const express = require('express');
const questController = require('../../controllers/questController');

const questRouter = express.Router();

questRouter.post('/', questController.saveData);

module.exports = questRouter;