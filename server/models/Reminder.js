const knex = require('../db/knex');
const authUtils = require('../utils/auth-utils');

class Reminder {

  constructor({ id, user_id, content, is_public, is_checked}) {
    this.id = id;
    this.user_id = user_id;
    this.content = content;
    this.is_public = is_public;
    this.is_checked = is_checked;
  }

  static async list(userId) {
    const query = `SELECT * FROM reminders WHERE user_id = ?`;
    const result = await knex.raw(query, [userId]);
    return result.rows.map((rawReminderData) => new Reminder(rawReminderData));
  }

  static async listPublics(userId) {
    const query = `SELECT * FROM reminders WHERE user_id = ? AND is_public = true`;
    const result = await knex.raw(query, [userId]);
    return result.rows.map((rawReminderData) => new Reminder(rawReminderData));
  }

  static async find(id) {
    const query = `SELECT * FROM reminders WHERE id = ?`;
    const result = await knex.raw(query, [id]);
    const rawReminderData = result.rows[0];
    return rawReminderData ? new Reminder(rawReminderData) : null;
  }
 
  static async create(userId, content, isPublic) {

    const query = `INSERT INTO reminders (user_id, content, is_public, is_checked)
      VALUES (?, ?, ?, false) RETURNING *`;
    const result = await knex.raw(query, [userId, content, isPublic]);
    const rawReminderData = result.rows[0];
    return new Reminder(rawReminderData);
  }

  static async update(id, type, value) {
    const query = `
      UPDATE reminders
      SET ??=?
      WHERE id=?
      RETURNING *
    `
    const result = await knex.raw(query, [type, value, id])
    const rawUpdatedReminder = result.rows[0];
    return rawUpdatedReminder ? new Reminder(rawUpdatedReminder) : null;
  };

  static async deleteAll() {
    return knex('reminders').del()
  }

  static async delete(id) {
    const query = `
      DELETE FROM reminders
      WHERE id=?
      RETURNING *
    `
    const result = await knex.raw(query, [id]);
    const rawDeletedReminder = result.rows[0];
    return rawDeletedReminder ? new Reminder(rawDeletedReminder) : null;
  }
}

module.exports = Reminder;