
exports.up = function(knex, Promise) {
  return knex.schema.createTable('signup_codes',
    function(table) {
      table.increments('code_id').unique().primary().unsigned().notNullable();
      table.string('code').notNullable();
      table.integer('user_id').unsigned()
      table.foreign('user_id').references('users.user_id');
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('signup_codes');
};
