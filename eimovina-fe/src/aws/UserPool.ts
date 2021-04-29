import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: "eu-central-1_YDWyNiJxb",
  ClientId: "50idrmvd148avagr9a1u96j7n3",
};

export const UserPool = new CognitoUserPool(poolData);
