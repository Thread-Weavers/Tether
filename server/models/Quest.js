const knex = require('../db/knex');
const authUtils = require('../utils/auth-utils');

class Quest {
  // This constructor is NOT how a controller creates a new user in the database.
  // Think of it more like a formatter function. It is used by each of the User 
  // static methods to hide the hashed password of users before sending user data 
  // to the client. Since we want to keep the #passwordHash property private, we 
  // provide the isValidPassword instance method as a way to indirectly access it.
  constructor({ id, user_id, first_answer, second_answer, third_answer, fourth_answer, fifth_answer, sixth_answer, seventh_answer, eighth_answer, ninth_answer, tenth_answer}) {
    this.id = id;
    this.user_id = user_id;
    this.first_answer = first_answer;
    this.second_answer = second_answer;
    this.third_answer = third_answer;
    this.fourth_answer = fourth_answer;
    this.fifth_answer = fifth_answer;
    this.sixth_answer = sixth_answer;
    this.seventh_answer = seventh_answer;
    this.eighth_answer = eighth_answer;
    this.ninth_answer = ninth_answer;
    this.tenth_answer = tenth_answer;
  }


  // Fetches ALL users from the users table, uses the constructor
  // to format each user (and hide their password hash), and returns.
  static async list() {
    const query = `SELECT * FROM questionnaire_data`;
    const result = await knex.raw(query);
    return result.rows.map((rawQuestData) => new Quest(rawQuestData));
  }

  static async find(id) {
    const query = `SELECT * FROM questionnaire_data WHERE id = ?`;
    const result = await knex.raw(query, [id]);
    const rawQuestData = result.rows[0];
    return rawQuestData ? new Quest(rawQuestData) : null;
  }

  static async create(user_id, first_answer, second_answer, third_answer, fourth_answer, fifth_answer, sixth_answer, seventh_answer, eighth_answer, ninth_answer, tenth_answer) {
    const query = `INSERT INTO questionnaire_data (user_id, first_answer, second_answer, third_answer, fourth_answer, fifth_answer, sixth_answer, seventh_answer, eighth_answer, ninth_answer, tenth_answer)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING *`;
    const result = await knex.raw(query, [user_id, first_answer, second_answer, third_answer, fourth_answer, fifth_answer, sixth_answer, seventh_answer, eighth_answer, ninth_answer, tenth_answer]);
    const rawQuestData = result.rows[0];
    return new Quest(rawQuestData);
  }

  static async deleteAll() {
    return knex('questionnaire_data').del()
  }
}

module.exports = Quest;
