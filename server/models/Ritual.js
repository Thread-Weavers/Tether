const knex = require('../db/knex');
const authUtils = require('../utils/auth-utils');

class Ritual {

  constructor({ id, user_id, content, is_public, is_checked}) {
    this.id = id;
    this.user_id = user_id;
    this.content = content;
    this.is_public = is_public;
    this.is_checked = is_checked;
  }

  static async list(userId) {
    const query = `SELECT * FROM rituals WHERE user_id = ?`;
    const result = await knex.raw(query, [userId]);
    return result.rows.map((rawRitualData) => new Ritual(rawRitualData));
  }

  static async find(id) {
    const query = `SELECT * FROM rituals WHERE id = ?`;
    const result = await knex.raw(query, [id]);
    const rawRitualData = result.rows[0];
    return rawRitualData ? new Ritual(rawRitualData) : null;
  }
 
  static async create(userId, content, isPublic) {

    const query = `INSERT INTO rituals (user_id, content, is_public, is_checked)
      VALUES (?, ?, ?, false) RETURNING *`;
    const result = await knex.raw(query, [userId, content, isPublic]);
    const rawRitualData = result.rows[0];
    return new Ritual(rawRitualData);
  }

  static async update(id, target, value) {
    const query = `
      UPDATE rituals
      SET ??=?
      WHERE id=?
      RETURNING *
    `
    const result = await knex.raw(query, [target, value, id])
    const rawUpdatedRitual = result.rows[0];
    return rawUpdatedRitual ? new Ritual(rawUpdatedRitual) : null;
  };

  static async deleteAll() {
    return knex('rituals').del()
  }

  static async delete(id) {
    const query = `
      DELETE FROM rituals
      WHERE id=?
      RETURNING *
    `
    const result = await knex.raw(query, [id]);
    const rawDeletedRitual = result.rows[0];
    return rawDeletedRitual ? new Ritual(rawDeletedRitual) : null;
  }
}

module.exports = Ritual;