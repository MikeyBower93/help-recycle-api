import express, {Request, Response} from 'express';
import {requestTypeValidationMiddleware, RequestValidationProperty} from '../middleware';
import {RecommendationSchema, Recommendation, Vote, VoteSchema} from "./models"; 
import recommendationDomain from './domain';
import {RecommendationQueryParameters, RecommendationQueryParametersSchema} from './dtos';

const router = express.Router();
 
router.get(
  '/',
  requestTypeValidationMiddleware(RequestValidationProperty.Query, RecommendationQueryParametersSchema),
  async (request: Request<{}, {}, {}, RecommendationQueryParameters, {}>, response: Response) => {  
    const recommendations = await recommendationDomain.fetchRecommendations(request.query);

    response.json(recommendations);
  }
);

router.put(
  '/',
  requestTypeValidationMiddleware(RequestValidationProperty.Body, RecommendationSchema),
  async (request : Request<{}, {}, Recommendation, {}, {}>, response :Response) => {
    const newRecommendation = await recommendationDomain.addOrUpdateRecommendation(request.body, request.user);

    response.json(newRecommendation);
  }
);

router.put(
  '/:recommendation_id/votes',
  requestTypeValidationMiddleware(RequestValidationProperty.Body, VoteSchema),
  async (request : Request<{}, {}, Vote, {}, {}>, response :Response) => {
    const recommendationId = parseInt(request.param('recommendation_id'));
    const recommendation = await recommendationDomain.getRecommendationById(recommendationId);

    if (!recommendation) {
      response.status(400).send();
    } else {  
      const vote = await recommendationDomain.addOrUpdateVote(recommendation, request.user, request.body);

      response.json(vote);
    }
  }
)

export default router;