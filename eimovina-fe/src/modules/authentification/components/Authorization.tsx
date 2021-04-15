import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserSession,
} from "amazon-cognito-identity-js";
import React, { createContext, FC } from "react";
import { UserPool } from "../../../aws/UserPool";

interface AuthorizationContextProps {
  authenticate: (Username: string, Password: string) => Promise<unknown>;
  getSession: () => Promise<unknown>;
  logout: () => void;
  isLoggedIn: () => boolean;
  loggedUser: () => CognitoUser | null;
}

const AuthorizationContext = createContext<AuthorizationContextProps>(
  {} as AuthorizationContextProps
);

const Authorization: FC = ({ children }) => {
  const getSession = async () =>
    await new Promise((resolve, reject) => {
      const user = UserPool.getCurrentUser();
      if (user) {
        user.getSession(
          (err: Error | null, session: CognitoUserSession | null) => {
            if (err) {
              reject();
            } else {
              resolve(session);
            }
          }
        );
      } else {
        reject("No user");
      }
    });

  const isLoggedIn = () => (loggedUser() ? true : false);

  const loggedUser = () => UserPool.getCurrentUser();

  const authenticate = async (Username: string, Password: string) =>
    await new Promise((resolve, reject) => {
      const user = new CognitoUser({
        Username,
        Pool: UserPool,
      });

      const authDetails = new AuthenticationDetails({
        Username,
        Password,
      });

      user.authenticateUser(authDetails, {
        onSuccess: (data) => {
          console.log("onSucess", data);
          resolve(data);
        },
        onFailure: (err) => {
          console.error("onfailure: ", err);
          reject(err);
        },
      });
    });

  const logout = () => {
    const user = UserPool.getCurrentUser();
    if (user) {
      user.signOut();
    }
  };
  return (
    <AuthorizationContext.Provider
      value={{
        authenticate,
        getSession,
        logout,
        isLoggedIn,
        loggedUser,
      }}
    >
      {children}
    </AuthorizationContext.Provider>
  );
};

export { Authorization, AuthorizationContext };
