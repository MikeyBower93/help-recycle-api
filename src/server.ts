import express from 'express';

const app = express();

app.get('/', (_request: express.Request, response: express.Response) => {
	response.send('hello world');
});

app.listen(
	process.env.PORT || 8080
)