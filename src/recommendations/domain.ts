import knex from '../knex/knex'; 
import {Recommendation} from './models';
 
/*
	Store the core domain/business logic rules in here which is the entrance point for
	the controller.
*/
class Domain {  
	public async fetchRecommendations(): Promise<Recommendation[]> {
		return await knex.from<Recommendation>('recommendations');
	}
}
 

export default new Domain();