import knex from '../knex/knex'; 
import {Recommendation} from './models';
import { User } from '../accounts/models';
 
/*
  Store the core domain/business logic rules in here which is the entrance point for
  the controller.
*/
class Domain {  
  public async fetchRecommendations(): Promise<Recommendation[]> {
    return await knex.from<Recommendation>('recommendations');
  }

  public async addOrUpdateRecommendation(recommendation: Recommendation, user: User): Promise<Recommendation> {
    // A user can only add 1 recommendation for a given type and location, therefore if one exists, it will simply update that 
    // recommendation
    const existingRecommendation = await knex
      .from('recommendations')
      .where('recycling_type', recommendation.recycling_type)
      .where('location', recommendation.location)
      .where('created_by_id', user.id)
      .first()
      .returning<Recommendation>('*');

    if(existingRecommendation) {
      existingRecommendation.instructions = recommendation.instructions;

      return await knex('recommendations')
        .where('id', existingRecommendation.id)
        .update({
          instructions: recommendation.instructions
        })
        .returning<Recommendation>('*')
    } else {
      recommendation.created_by_id = user.id;

      return await knex('recommendations')
        .insert(recommendation)
        .returning<Recommendation>('*')
    }
  };
}
 

export default new Domain();