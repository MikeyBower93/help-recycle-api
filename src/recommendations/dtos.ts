import Joi from 'joi';
import * as core from 'express-serve-static-core';

interface RecommendationQueryParameters extends core.Query {
  recycling_type: string;
  location: string;
}

const RecommendationQueryParametersSchema = Joi.object({
  recycling_type: Joi.string(),
  location: Joi.string()
});
 
export {RecommendationQueryParameters, RecommendationQueryParametersSchema};