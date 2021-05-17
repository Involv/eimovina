import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: "eu-central-1_cWuuaJUtK",
  ClientId: "4bmhdnm2rkdihkvac54dmprs82",
};

export const UserPool = new CognitoUserPool(poolData);
