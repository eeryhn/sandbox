
exports.up = function(knex, Promise) {
  return knex.schema.createTable('comments',
    function(table) {
      table.increments('comment_id').unique().primary().unsigned().notNullable();
      table.text('content').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.string('page_id').notNullable();
      table.string('block_id').notNullable();
      table.integer('user_id').unsigned().notNullable();
      table.integer('parent_id').unsigned();
      table.foreign('user_id').references('users.user_id');
      table.foreign('parent_id').references('comments.comment_id');
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('comments');
};
