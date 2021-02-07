import knex from '../knex/knex'; 
import {Recommendation, Vote} from './models';
import { User } from '../accounts/models';
import {RecommendationQueryParameters} from './dtos';
 
/*
  Store the core domain/business logic rules in here which is the entrance point for
  the controller.
*/
class Domain {  
  public async getRecommendationById(id: number): Promise<Recommendation> {
    return await knex.from('recommendations')
      .where('id', id)
      .first()
      .returning<Recommendation>('*')
  }

  public async fetchRecommendations(filters: RecommendationQueryParameters): Promise<Recommendation[]> {
    const query = knex.from('recommendations');

    if(filters.location) {
      query.where('location', filters.location);
    }

    if(filters.recycling_type) {
      query.where('recycling_type', filters.recycling_type);
    }

    return await query.returning<Recommendation[]>('*');
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

  public async addOrUpdateVote(recommendation: Recommendation, user: User, vote: Vote): Promise<Vote> {
    // If we already have a vote for that recommendation and user, its just a case of updating the type.
    const existingVote = await knex
    .from('votes')
    .where('recommendation_id', recommendation.id) 
    .where('created_by_id', user.id)
    .first()
    .returning<Vote>('*');

    if(existingVote) { 
      return await knex('votes')
        .where('id', existingVote.id)
        .update({
          vote_type: vote.vote_type
        })
        .returning<Vote>('*')
    } else {
      vote.created_by_id = user.id;
      vote.recommendation_id = recommendation.id;

      return await knex('votes')
        .insert(vote)
        .returning<Vote>('*')
    }
  };
}
 

export default new Domain();