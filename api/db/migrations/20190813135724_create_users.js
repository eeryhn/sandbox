
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users',
    function(table) {
      table.increments('user_id').unique().primary().unsigned().notNullable();
      table.string('name').notNullable();
      table.string('email').unique().notNullable();
      table.string('password').notNullable();
      table.string('confirmation');
      table.enu('type', ['itme', 'itfriend', 'notfriend', 'who']).defaultTo('itfriend').notNullable();
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
