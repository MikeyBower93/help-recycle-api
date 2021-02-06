import Joi from 'joi';

interface LoginRequest {
  email: string;
  password: string;
}

const LoginRequestSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required()
});
 
export {LoginRequest, LoginRequestSchema};