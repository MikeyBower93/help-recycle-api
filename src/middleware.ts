import express from 'express';
import Joi from 'joi';
import jwt from 'jsonwebtoken'; 
import accountDomain from './accounts/domain';
import { User } from './accounts/models';

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

const requiresAuthenticatedUserMiddleware = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
  const bearer = request.headers.authorization;
 
  if(bearer) {
    const {valid, user} = await accountDomain.verifyUserByToken(bearer);

    if(!valid) { 
      response.status(401).end();
    } else {
      request.user = user as User;
      next();
    }
  } else {
    response.status(401).end();
  } 
};
  
export {
  requestBodyTypeValidationMiddleware,
  requiresAuthenticatedUserMiddleware
};