import express from 'express';
import bodyParser from 'body-parser';
import accountsRouter from './accounts/router';
import recommendationsRouter from './recommendations/router';
import { requiresAuthenticatedUserMiddleware } from './middleware';

const app = express();
app.use(bodyParser());

app.use('/accounts', accountsRouter);
app.use('/recommendations', requiresAuthenticatedUserMiddleware, recommendationsRouter);

app.listen(
  process.env.PORT || 8080
)