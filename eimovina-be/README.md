# eimovina-be

eimovina-be is the backend part of the Montenegro's web based cadastral survey system. It is written in Serverless framework with AWS services.

### Prerequisites

- AWS CLI needs to be configured locally
- Algolia app needs to be connected with eimovina-be serverless project with commands
```
aws --profile default --region eu-central-1 ssm put-parameter --name eimovina-be-algolia-app-id --value <your_algolia_app_id> --type String
aws --profile default --region eu-central-1 ssm put-parameter --name eimovina-be-algolia-admin-api-key --value <your_admin_api_key> --type String
```

### Run

In order to run this project, use command
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
