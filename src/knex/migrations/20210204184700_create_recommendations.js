exports.up = function(knex, _Promise) {
  return knex.schema.createTable('recommendations', (t) => {
    t.increments('id').unsigned().primary(); 
    t.string('instructions').notNullable();
    t.bigInteger('created_by_id').references('id').inTable('users').notNullable();
    t.string('recycling_type').notNullable();
    t.string('location').notNullable();
  });
};

exports.down = function(knex, _Promise) {
  return knex.schema.dropTable('recommendations');
};