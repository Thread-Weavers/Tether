/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('goals', (table) => {
    table.increments();
    table.integer('user_id').notNullable();
    table.string('content').notNullable();
    table.boolean('is_public').notNullable();
    table.boolean('is_checked').notNullable();
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.dropTable('goals');