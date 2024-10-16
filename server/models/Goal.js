const knex = require('../db/knex');
const authUtils = require('../utils/auth-utils');

class Goal {

  constructor({ id, userId, content, isPublic, isChecked}) {
    this.id = id;
    this.userId = userId;
    this.content = content;
    this.isPublic = is_public;
    this.isChecked = is_checked;
  }

  static async list() {
    const query = `SELECT * FROM goals`;
    const result = await knex.raw(query);
    return result.rows.map((rawGoalData) => new Goal(rawGoalData));
  }

  static async find(id) {
    const query = `SELECT * FROM goals WHERE id = ?`;
    const result = await knex.raw(query, [id]);
    const rawGoalData = result.rows[0];
    return rawGoalData ? new Goal(rawGoalData) : null;
  }
 
  static async create(userId, content, isPublic) {

    const query = `INSERT INTO goals (userId, content, isPublic)
      VALUES (?, ?, ?, false) RETURNING *`;
    const result = await knex.raw(query, [userId, content, isPublic]);
    const rawGoalData = result.rows[0];
    return new Goal(rawGoalData);
  }

  static async update(id, type, value) {
    const query = `
      UPDATE goals
      SET ??=?
      WHERE id=?
      RETURNING *
    `
    const result = await knex.raw(query, [type, value, id])
    const rawUpdatedGoal = result.rows[0];
    return rawUpdatedGoal ? new Goal(rawUpdatedGoal) : null;
  };

  static async deleteAll() {
    return knex('goals').del()
  }
}

module.exports = Goal;
