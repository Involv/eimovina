import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: "eu-central-1_rOABX5RBA",
  ClientId: "47kki8m9cgi0nl911hle1ihgfu",
};

export const UserPool = new CognitoUserPool(poolData);
