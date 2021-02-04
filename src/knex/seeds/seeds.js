exports.seed = async function(knex) {
  await knex('recommendations').del();
  await knex('users').del();

  const users =
    await knex('users').insert({
      email: 'mikey.bower93@gmail.com',
      first_name: 'Mike',
      last_name: 'Bower',
      password_hash: '$2y$10$7o9QFlvbAGzcUIX/ftZtIe1SJQPxKXLmSbSvSkygiTkfhq7DrUXfC'
    }).returning('*');

  const devUser = users[0];

  await knex('recommendations').insert([
    {
      instructions: 'Recycle at recycling plant.',
      recycling_type: 'Plastic',
      location: 'Beverley',
      created_by_id: devUser.id
    }, 
    {
      instructions: 'Return to shows.',
      recycling_type: 'Glass',
      location: 'Beverley',
      created_by_id: devUser.id
    }, 
  ]);
};