import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: "eu-central-1_oue69mKhb",
  ClientId: "55aqvmjn3dac2gatdb111rc8je",
};

export const UserPool = new CognitoUserPool(poolData);
