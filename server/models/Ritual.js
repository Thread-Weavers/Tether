const knex = require('../db/knex');
const authUtils = require('../utils/auth-utils');

class Ritual {

  constructor({ id, userId, content, isPublic, isChecked}) {
    this.id = id;
    this.userId = userId;
    this.content = content;
    this.isPublic = is_public;
    this.isChecked = is_checked;
  }

  static async list() {
    const query = `SELECT * FROM rituals`;
    const result = await knex.raw(query);
    return result.rows.map((rawRitualData) => new Ritual(rawRitualData));
  }

  static async find(id) {
    const query = `SELECT * FROM rituals WHERE id = ?`;
    const result = await knex.raw(query, [id]);
    const rawRitualData = result.rows[0];
    return rawRitualData ? new Ritual(rawRitualData) : null;
  }
 
  static async create(userId, content, isPublic) {

    const query = `INSERT INTO rituals (userId, content, isPublic)
      VALUES (?, ?, ?, false) RETURNING *`;
    const result = await knex.raw(query, [userId, content, isPublic]);
    const rawRitualData = result.rows[0];
    return new Ritual(rawRitualData);
  }

  static async update(id, type, value) {
    const query = `
      UPDATE rituals
      SET ??=?
      WHERE id=?
      RETURNING *
    `
    const result = await knex.raw(query, [type, value, id])
    const rawUpdatedRitual = result.rows[0];
    return rawUpdatedRitual ? new Ritual(rawUpdatedRitual) : null;
  };

  static async deleteAll() {
    return knex('rituals').del()
  }
}

module.exports = Ritual;
