import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: "eu-central-1_xqU2WHgot",
  ClientId: "51e56bgiaa3d51ep6rc53g7iba",
};

export const UserPool = new CognitoUserPool(poolData);
