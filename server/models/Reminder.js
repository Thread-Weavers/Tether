const knex = require('../db/knex');
const authUtils = require('../utils/auth-utils');

class Reminder {

  constructor({ id, userId, content, isPublic, isChecked}) {
    this.id = id;
    this.userId = userId;
    this.content = content;
    this.isPublic = is_public;
    this.isChecked = is_checked;
  }

  static async list() {
    const query = `SELECT * FROM reminders`;
    const result = await knex.raw(query);
    return result.rows.map((rawReminderData) => new Reminder(rawReminderData));
  }

  static async find(id) {
    const query = `SELECT * FROM reminders WHERE id = ?`;
    const result = await knex.raw(query, [id]);
    const rawReminderData = result.rows[0];
    return rawReminderData ? new Reminder(rawReminderData) : null;
  }
 
  static async create(userId, content, isPublic) {

    const query = `INSERT INTO reminders (userId, content, isPublic)
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
}

module.exports = Reminder;