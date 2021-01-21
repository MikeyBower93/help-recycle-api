exports.seed = function(knex) {
  return knex('users').del()
    .then(function () {
      // Not actually ran on production, just a seed user for local development.
      return knex('users').insert([
        {
          email: 'mikey.bower93@gmail.com',
          firstName: 'Mike',
          lastName: 'Bower',
          password_hash: '$2y$10$7o9QFlvbAGzcUIX/ftZtIe1SJQPxKXLmSbSvSkygiTkfhq7DrUXfC'
        }, 
      ]);
    });
};