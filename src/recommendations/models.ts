import Joi from 'joi';

interface Recommendation {
	id: number;
	created_by_id: number;
	instructions: string;
	recycling_type: string;
	location: string;
}

const RecommendationSchema = Joi.object({
  instructions: Joi.string().required().max(200),
	recycling_type: Joi.string().required(),
	location: Joi.string().required()
});

export {Recommendation, RecommendationSchema};