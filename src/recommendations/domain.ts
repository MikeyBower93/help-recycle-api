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
      .first<Recommendation>()
  }

  public async fetchRecommendations(filters: RecommendationQueryParameters): Promise<Recommendation[]> {
    const query = knex.from('recommendations') 
      .innerJoin('users', 'users.id', 'recommendations.created_by_id')
      .select(
        'recommendations.*',  
        knex.raw('users.first_name AS created_by_first_name, users.last_name AS created_by_last_name, users.email AS created_by_email'),  
        knex.raw('(SELECT COUNT(1) FROM votes v WHERE v.vote_type = \'up\' AND v.recommendation_id = recommendations.id) AS up_votes'), 
        knex.raw('(SELECT COUNT(1) FROM votes v WHERE v.vote_type = \'down\' AND v.recommendation_id = recommendations.id) AS down_votes')
      );

    if(filters.location) {
      query.where('location', filters.location);
    }

    if(filters.recycling_type) {
      query.where('recycling_type', filters.recycling_type);
    }
 
    const queryResults = await query;

    return queryResults.map<Recommendation>((result) => {
      return {
        id: result.id,
        instructions: result.instructions,
        recycling_type: result.recycling_type,
        created_by_id: result.created_by_id,
        location: result.location,
        up_votes: result.up_votes,
        down_votes: result.down_votes,
        created_by: {
          id: result.created_by_id,
          first_name: result.created_by_first_name,
          last_name: result.created_by_last_name,
          email: result.created_by_email
        }
      } as Recommendation;
    });
  }

  public async addOrUpdateRecommendation(recommendation: Recommendation, user: User): Promise<Recommendation> {
    // A user can only add 1 recommendation for a given type and location, therefore if one exists, it will simply update that 
    // recommendation
    const existingRecommendation = await knex
      .from('recommendations')
      .where('recycling_type', recommendation.recycling_type)
      .where('location', recommendation.location)
      .where('created_by_id', user.id)
      .first<Recommendation>();

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
    .first<Vote>();

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