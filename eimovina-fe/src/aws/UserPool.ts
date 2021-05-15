import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: "eu-central-1_F7UoTLuzq",
  ClientId: "bjsmps8q7hcfbep86j7gldg09",
};

export const UserPool = new CognitoUserPool(poolData);
