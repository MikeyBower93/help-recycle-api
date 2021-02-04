import express, {Request, Response} from 'express';
import recommendationDomain from './domain';

const router = express.Router();
 
router.get(
	'/',
	async (_request: Request, response: Response) => {  
		try {
			const recommendations = await recommendationDomain.fetchRecommendations();

			response.json(recommendations);
		} catch(error) {
			console.error(error);
		}
	}
);

export default router;