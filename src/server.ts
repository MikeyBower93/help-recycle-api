import express from 'express';
import bodyParser from 'body-parser';
import accountsRouter from './accounts/router';

const app = express();
app.use(bodyParser());

app.use('/accounts', accountsRouter);
 
app.listen(
	process.env.PORT || 8080
)