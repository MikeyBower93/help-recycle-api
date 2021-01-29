import express from 'express';
import Joi from 'joi';

/* 
	Validate the incoming request body to ensure it meets the model type definition
	if it doesn't it will return a bad request. 
*/
const requestBodyTypeValidationMiddleware = (schema: Joi.Schema) => {
	return (request: express.Request, response: express.Response, next: express.NextFunction) => {
		const { error } = schema.validate(request.body); 
		const valid = error == null; 
		if (valid) { 
			next(); 
		} 
		else {  
			response.status(400).end();
		} 
	}
};
	
export {requestBodyTypeValidationMiddleware};