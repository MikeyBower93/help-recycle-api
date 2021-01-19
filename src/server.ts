import express from 'express';

const app = express();

app.get('/', (_request: express.Request, response: express.Response) => {
	response.send('hello world from beanstalk 4');
});

app.listen(
	process.env.PORT || 8080
)