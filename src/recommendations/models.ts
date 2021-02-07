import Joi from 'joi';
import { User } from '../accounts/models';

interface Recommendation {
  id: number;
  created_by_id: number;
  instructions: string;
  recycling_type: string;
  location: string;
  up_votes: number;
  down_votes: number;
  created_by: User;
}

const RecommendationSchema = Joi.object({
  instructions: Joi.string().required().max(200),
  recycling_type: Joi.string().required(),
  location: Joi.string().required()
});
 
interface Vote {
  id: number;
  created_by_id: number; 
  recommendation_id: number;  
  vote_type: string; 
}

const VoteSchema = Joi.object({
  vote_type: Joi.string().required().valid(...['up', 'down']), 
});

export {
  Recommendation, 
  RecommendationSchema,
  Vote,
  VoteSchema
};