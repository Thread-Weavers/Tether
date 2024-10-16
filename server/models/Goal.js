const knex = require('../db/knex');
const authUtils = require('../utils/auth-utils');

class Goal {

  constructor({ id, user_id, content, is_public, is_checked}) {
    this.id = id;
    this.user_id = user_id;
    this.content = content;
    this.is_public = is_public;
    this.is_checked = is_checked;
  }

  static async list(userId) {
    const query = `SELECT * FROM goals WHERE user_id = ?`;
    const result = await knex.raw(query, [userId]);
    return result.rows.map((rawGoalData) => new Goal(rawGoalData));
  }

  static async find(id) {
    const query = `SELECT * FROM goals WHERE id = ?`;
    const result = await knex.raw(query, [id]);
    const rawGoalData = result.rows[0];
    return rawGoalData ? new Goal(rawGoalData) : null;
  }
 
  static async create(userId, content, isPublic) {

    const query = `INSERT INTO goals (user_id, content, is_public, is_checked)
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

  static async delete(id) {
    const query = `
      DELETE FROM goals
      WHERE id=?
      RETURNING *
    `
    const result = await knex.raw(query, [id]);
    const rawDeletedGoal = result.rows[0];
    return rawDeletedGoal ? new Goal(rawDeletedGoal) : null;
  }
}

module.exports = Goal;