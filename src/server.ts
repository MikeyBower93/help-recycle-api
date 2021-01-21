import express from 'express';
import knex from './knex/knex';

const app = express();

app.get('/', async (_request: express.Request, response: express.Response) => {
  const users = await knex.from('users').select('firstName', 'lastName', 'email');

  response.json(users);
});

app.listen(
	process.env.PORT || 8080
)