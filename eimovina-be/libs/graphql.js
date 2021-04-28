import "isomorphic-fetch";
import AWS from "aws-sdk/global.js";
import  { AWSAppSyncClient, AUTH_TYPE } from "aws-appsync";
import graphql from "graphql-tag";
import { ulid } from "ulid";

// const { GRAPHQL_API_URL, AWS_REGION } = process.env;
const GRAPHQL_API_URL = "https://xzjlqs2zqratjbncc5kj54kc5a.appsync-api.eu-central-1.amazonaws.com/graphql";
const AWS_REGION = "eu-central-1";
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
  console.log("MUTATE IS CALLED");
  console.log("GRAPHQL URL: ", GRAPHQL_API_URL);
  console.log("AWS REGION: ", AWS_REGION);
  const id = ulid();
  console.log("ID", id);
  const query1 = graphql `mutation notifyPropertyUpdated(
    $id: ID!
    $userId: ID!
    $propertyId: ID!
  ) {
    notifyPropertyUpdated(
      id: $id
      userId: $userId
      propertyId: $propertyId
    ) {
      id
      userId
      propertyId
      createdAt
    }
  }`;
  const variables1 = {
    id: id,
    userId: "29be4080-8ede-4b8d-8757-447cf26afc3a",
    propertyId: "11111",
  };
  try {
    await appSyncClient.mutate({ mutation: query1, variables: variables1});
  } catch (e) {
    console.log("MUTATE ERR: ", e);
  }
  console.log("MUTATE IS DONE");
};