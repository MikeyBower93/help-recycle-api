import express, {Request, Response} from 'express';
import {requiresAuthenticatedUserMiddleware} from '../middleware';

const router = express.Router();
 
router.get(
	'/test', 
	requiresAuthenticatedUserMiddleware,
	async (request: Request, response: Response) => {  
		response.send(`hello ${request.user?.email} you are authenticated.`);
	}
);

export default router;