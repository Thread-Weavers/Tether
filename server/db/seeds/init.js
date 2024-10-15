const User = require('../../models/User');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async (knex) => {
  // Before you have models you can always just do `await knex('table_name').del`
  await knex('users').del();

  await knex.raw('ALTER SEQUENCE users_id_seq RESTART WITH 1');

  // User.create(username, password)
  await User.create('Cathleen', 'Boyd', 'cool_cat', 'coolcatb@yahoo.com', '1234');
  await User.create('Brandon', 'Rojas', 'l33t-guy', 'leetcodefan@gmail.com', '1234');
  await User.create('some', 'one', 'wowow', 'burner@yopmail.com', '1234');
};
