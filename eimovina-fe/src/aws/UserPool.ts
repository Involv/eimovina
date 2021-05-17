import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: "eu-central-1_GgnG9YNBs",
  ClientId: "56nv9l8lkos4568dan4n55ivmg",
};

export const UserPool = new CognitoUserPool(poolData);
