# eimovina-be

eimovina-be is the backend part of the Montenegro's web based cadastral survey system. It is written in Serverless framework with AWS services.
In order to run it, use command
```
npm run sls -- deploy
```
> Before running the project, install dependencies with the command
> **npm install**

## Used AWS services

- **DynamoDB** - database.
- **AppSync** - GraphQL communication.
- **Cognito** - user authentication.
- **Algolia** - search.

## Main models

- **Property**
- **User**
> Check them inside ./schema.graphql

## CI/CD

- **dev** - merge on this branch triggers deployment on **development** environment
- **production** - merge on this branch triggers deployment on **production** environment
