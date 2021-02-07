exports.up = function(knex, _Promise) {
  return knex.schema.createTable('votes', (t) => {
    t.increments('id').unsigned().primary(); 
    t.string('vote_type').notNullable();
    t.bigInteger('recommendation_id').references('id').inTable('recommendations').notNullable(); 
    t.bigInteger('created_by_id').references('id').inTable('users').notNullable(); 
  });
};

exports.down = function(knex, _Promise) {
  return knex.schema.dropTable('votes');
};