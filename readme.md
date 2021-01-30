# Project Description
This Help Recycle project is intended to solve the problem in the UK where there are several recycling labels, but different localities have different rules around the recycling material, thus resulting in things getting recycled when they shouldn't be, or things not being recycled when they can be.

This project will work as a mobile app which will help the user locate the label, there location and look for recommendations based on other users recommendations for that locality and recycling label.

This part of the project is the API to service mobile requests. 

# Project Structure

At the root level we have the basic server where express is initialised, along with configuration files and basic web utilities such as middleware. The application is the vertically sliced into domains which often looks like this:

- `[DOMAIN_TYPE]/domain.ts` - this is the business logic/domain rules entry point.
- `[DOMAIN_TYPE]/dtos.ts` - this is the dtos for requests to that domain.
- `[DOMAIN_TYPE]/models.ts` - underlying data models for that domain.
- `[DOMAIN_TYPE]/router.ts` - the web express entrypoint for that domain.

# Helpful Commands

## Authenticate User 

`curl -d '{"email": "email", "password":"password"}' -H "Content-Type: application/json" -X POST http://localhost:8080/accounts/login`

# Todos

- Authenticated user routes
- Recommendations domain for recommendations for a recycling type, and the recommender (user)