import bcrypt from 'bcryptjs'; 
import knex from '../knex/knex';
import jwt from 'jsonwebtoken';
import {LoginRequest} from './dtos';
import {User} from './models';

enum LoginResponseCode {
  Success,
  InvalidDetails
}

/*
  Store the core domain/business logic rules in here which is the entrance point for
  the controller.
*/
class Domain {
  private async authenticateUser(user: User, password: string): Promise<boolean> {
    return await bcrypt.compare(password, user.password_hash);
  }

  private async signUser(user: User): Promise<string> {
    return await jwt.sign({email: user.email}, process.env.JWT_SECRET as string);
  }

  public async findUserByEmail(email: string): Promise<User | null> {
    return await knex
    .from('users')
    .where('email', email) 
    .first<User | null>();
  }

  public async verifyUserByToken(token: string): Promise<{user: User | null, valid: boolean}> {
    const decodedJwt = jwt.verify(token, process.env.JWT_SECRET as string) as any;
  
    const user = await this.findUserByEmail(decodedJwt.email);

    return {
      user,
      valid: user ? true : false
    }
  }

  // Takes in a login request (essentially an email and raw password), authenticates the user
  // and then signs the user. 
  public async loginUser(
    loginRequest: LoginRequest
  ): Promise<{responseCode: LoginResponseCode, user: User | null, token: string | null}> {
    const user = await this.findUserByEmail(loginRequest.email);

    // First attempt to check the user exists by the email.
    if(!user) {
      return {responseCode: LoginResponseCode.InvalidDetails, user: null, token: null};
    }

    // Check that the passwords match.
    if(!(await this.authenticateUser(user, loginRequest.password))) {
      return {responseCode: LoginResponseCode.InvalidDetails, user: null, token: null};
    } 

    // Sign and we are now happy. 
    const token = await this.signUser(user);

    return {
      responseCode: LoginResponseCode.Success,
      user: user,
      token: token
    };
  }
}
 

export default new Domain();
export {LoginResponseCode};