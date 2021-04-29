import "isomorphic-fetch";
import AWS from "aws-sdk/global.js";
import  { AWSAppSyncClient, AUTH_TYPE } from "aws-appsync";

const { GRAPHQL_API_URL, AWS_REGION } = process.env;
const config = {
  url: GRAPHQL_API_URL,
  region: AWS_REGION,
  auth: {
    type: AUTH_TYPE.AWS_IAM,
    credentials: AWS.config.credentials,
  },
  disableOffline: true,
};
const appSyncClient = new AWSAppSyncClient(config);

export const mutate = async (query, variables) => {
  await appSyncClient.mutate({
    mutation: query,
    variables,
  });
};