/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('questionnaire_data', (table) => {
        table.increments();
        table.string('first_answer');
        table.string('second_answer');
        table.string('third_answer');
        table.string('fourth_answer');
        table.string('fifth_answer');
        table.string('sixth_answer');
        table.string('seventh_answer');
        table.string('eighth_answer');
        table.string('ninth_answer');
        table.string('tenth_answer');
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.dropTable('questionnaire_data');
