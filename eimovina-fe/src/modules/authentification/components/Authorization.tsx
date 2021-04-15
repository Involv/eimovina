import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserSession,
} from "amazon-cognito-identity-js";
import React, { createContext, FC, useEffect, useState } from "react";
import { UserPool } from "../../../aws/UserPool";
import { LocalStorageKeys } from "../enums/local-storage-keysenum.";

interface AuthorizationContextProps {
  authenticate: (Username: string, Password: string) => Promise<unknown>;
  getSession: () => Promise<unknown>;
  logout: () => void;
  user: CognitoUser | null;
}

const AuthorizationContext = createContext<AuthorizationContextProps>(
  {} as AuthorizationContextProps
);

const Authorization: FC = ({ children }) => {
  const [user, setUser] = useState<CognitoUser | null>(null);

  useEffect(() => {
    getSession().then(() => setUser(UserPool.getCurrentUser()));
  }, []);

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
          setUser(user);
          const accessToken = data.getAccessToken().getJwtToken();
          localStorage.setItem(
            LocalStorageKeys.eimovinaAccessToken,
            accessToken
          );
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
      setUser(null);
      localStorage.removeItem(LocalStorageKeys.eimovinaAccessToken);
      user.signOut();
    }
  };
  return (
    <AuthorizationContext.Provider
      value={{
        authenticate,
        getSession,
        logout,
        user,
      }}
    >
      {children}
    </AuthorizationContext.Provider>
  );
};

export { Authorization, AuthorizationContext };
