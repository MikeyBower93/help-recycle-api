import express, {Request, Response} from 'express';
import {requestBodyTypeValidationMiddleware} from '../middleware';
import {RecommendationSchema, Recommendation} from "./models"; 
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

router.put(
  '/',
  requestBodyTypeValidationMiddleware(RecommendationSchema),
  async (request : Request<{}, {}, Recommendation, {}, {}>, response :Response) => {
    const newRecommendation = await recommendationDomain.addOrUpdateRecommendation(request.body, request.user);

    response.json(newRecommendation);
  }
);

export default router;