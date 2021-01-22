exports.up = function(knex, _Promise) {
  return knex.schema.createTable('users', (t) => {
    t.increments('id').unsigned().primary(); 
    t.string('password_hash').notNullable();
    t.string('email').notNullable();
    t.string('first_name').notNullable();  
    t.string('last_name').notNullable();  
  });
};

exports.down = function(knex, _Promise) {
  return knex.schema.dropTable('users');
};