import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: "eu-central-1_chIopxm2M",
  ClientId: "5g9t6msshe055b7a36ee4bm2tk",
};

export const UserPool = new CognitoUserPool(poolData);
