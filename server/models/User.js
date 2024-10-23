const knex = require('../db/knex');
const authUtils = require('../utils/auth-utils');

class User {
  #passwordHash = null; // a private property

  // This constructor is NOT how a controller creates a new user in the database.
  // Think of it more like a formatter function. It is used by each of the User 
  // static methods to hide the hashed password of users before sending user data 
  // to the client. Since we want to keep the #passwordHash property private, we 
  // provide the isValidPassword instance method as a way to indirectly access it.
  constructor({ id, first_name, last_name, username, email, password_hash, is_online, is_partnered, partner_id, bio}) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.username = username;
    this.email = email;
    this.#passwordHash = password_hash;
    this.is_online = is_online;
    this.is_partnered = is_partnered;
    this.partner_id = partner_id;
    this.bio = bio;
  }

  // This instance method takes in a plain-text password and returns true if it matches
  // the User instance's hashed password. Can be used by controllers.
  isValidPassword = async (password) => (
    authUtils.isValidPassword(password, this.#passwordHash)
  );



  // Fetches ALL users from the users table, uses the constructor
  // to format each user (and hide their password hash), and returns.
  static async list() {
    const query = `SELECT * FROM users`;
    const result = await knex.raw(query);
    return result.rows.map((rawUserData) => new User(rawUserData));
  }

  // Fetches A single user from the users table that matches
  // the given user id. If it finds a user, uses the constructor
  // to format the user and returns or returns null if not.
  static async find(id) {
    const query = `SELECT * FROM users WHERE id = ?`;
    const result = await knex.raw(query, [id]);
    const rawUserData = result.rows[0];
    return rawUserData ? new User(rawUserData) : null;
  }


  // Same as above but uses the username to find the user
  static async findByUsername(username) {
    const query = `SELECT * FROM users WHERE username = ?`;
    const result = await knex.raw(query, [username]);
    const rawUserData = result.rows[0];
    return rawUserData ? new User(rawUserData) : null;
  }

  // Hashes the given password and then creates a new user
  // in the users table. Returns the newly created user, using
  // the constructor to hide the passwordHash. 
  static async create(first_name, last_name, username, email, password) {
    // hash the plain-text password using bcrypt before storing it in the database
    const passwordHash = await authUtils.hashPassword(password);

    const query = `INSERT INTO users (first_name, last_name, username, email, password_hash, is_online, is_partnered, bio)
      VALUES (?, ?, ?, ?, ?, false, false, 'No bio') RETURNING *`;
    const result = await knex.raw(query, [first_name, last_name, username, email, passwordHash]);
    const rawUserData = result.rows[0];
    return new User(rawUserData);
  }

  // Updates the user that matches the given id with a new username.
  // Returns the modified user, using the constructor to hide the passwordHash. 
  static async update(id, target, value) {
    const query = `
      UPDATE users
      SET ??=?
      WHERE id=?
      RETURNING *
    `
    const result = await knex.raw(query, [target, value, id])
    const rawUpdatedUser = result.rows[0];
    return rawUpdatedUser ? new User(rawUpdatedUser) : null;
  };

  static async deleteAll() {
    return knex('users').del()
  }

  static async setOnline(id, value) {
    const query = `
      UPDATE users
      SET is_online=?
      WHERE id=?
      RETURNING *
    `
    const result = await knex.raw(query, [value, id]);
    const rawUpdatedUser = result.rows[0];
    return rawUpdatedUser ? new User(rawUpdatedUser) : null;
  }

  static async getUnmatchedUsers() {
    const query = `
      SELECT * FROM users
      WHERE is_partnered = false;
    `
    const result = await knex.raw(query);
    return result.rows.map((rawUserData) => new User(rawUserData));
  }

  static async saveQuestionnaire() {
    const query = ``
  }
}

module.exports = User;