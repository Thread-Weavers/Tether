/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('rituals', (table) => {
        table.increments();
        table.integer('userId').notNullable();
        table.string('content').notNullable();
        table.boolean('isPublic').notNullable();
        table.boolean('isChecked').notNullable();
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.dropTable('rituals');
