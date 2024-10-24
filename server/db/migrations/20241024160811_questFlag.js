exports.up = function(knex) {
    return knex.schema.alterTable('users', (table) => {
        table.boolean('quest_flag').notNullable().defaultTo(false);
    })
  
};

exports.down = function(knex) {
    return knex.schema.alterTable('users', (table) => {
        table.dropColumn('quest_flag');
    })
};
