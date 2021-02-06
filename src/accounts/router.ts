import express, {Request, Response} from 'express';
import {requestBodyTypeValidationMiddleware} from '../middleware'; 
import {LoginRequest, LoginRequestSchema} from './dtos'; 
import accountDomain, {LoginResponseCode} from './domain';

const router = express.Router();
 
router.post(
  '/login', 
  requestBodyTypeValidationMiddleware(LoginRequestSchema),
  async (request: Request<{}, {}, LoginRequest, {}, {}>, response: Response) => { 
    const {responseCode, user, token} = await accountDomain.loginUser(request.body);

    switch(responseCode) {
      case LoginResponseCode.InvalidDetails:
        response.status(400).send();
      case LoginResponseCode.Success: 
        response.json({
          token: token,
          email: user?.email, 
          first_name:  user?.first_name,
          last_name: user?.last_name
        });
    } 
  }
);

export default router;