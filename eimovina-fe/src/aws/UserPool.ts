import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: "eu-central-1_1ekDz8GSm",
  ClientId: "3lcoqrs8vj6g56p7b5fbavgse0",
};

export const UserPool = new CognitoUserPool(poolData);
