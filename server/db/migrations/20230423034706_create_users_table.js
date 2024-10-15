/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => {
  return knex.schema.createTable('users', (table) => {
    table.increments();
    table.string('first_name').notNullable().defaultTo('John');
    table.string('last_name').notNullable().defaultTo('Doe');
    table.string('username').notNullable().unique();
    table.string('email').notNullable().unique();
    table.string('password_hash').notNullable();
    table.boolean('is_online').notNullable().defaultTo(false);
    table.boolean('is_partnered').notNullable().defaultTo(false);
    table.integer('partner_id');
    table.string('bio');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.dropTable('users');
