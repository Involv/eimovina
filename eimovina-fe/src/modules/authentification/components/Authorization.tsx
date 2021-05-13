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
  confirmRegistration: (Username: string, code: string) => Promise<unknown>;
  resendConfirmationCode: (Username: string) => Promise<unknown>;
  getSession: () => Promise<unknown>;
  logout: () => void;
  user: CognitoUser | null;
}

const AuthorizationContext = createContext<AuthorizationContextProps>(
  {} as AuthorizationContextProps
);

const Authorization: FC = ({ children }) => {
  const [user, setUser] = useState<CognitoUser | null>(null);

  const getUser = (): CognitoUser | null => {
    const user = UserPool.getCurrentUser();
    user?.getSession((err: Error | null, data: CognitoUserSession | null) => {
      console.log({ data });
      if (err) {
        // Prompt the user to reauthenticate by hand...
      } else {
        const cognitoUserSession = data;
        const accessToken = cognitoUserSession?.getAccessToken()?.getJwtToken();
        if (accessToken) {
          localStorage.setItem(
            LocalStorageKeys.eimovinaAccessToken,
            accessToken
          );
        }
      }
    });
    if (user) {
      return user;
    }
    return null;
  };

  useEffect(() => {
    // getSession().then(() => setUser(UserPool.getCurrentUser()));
    setUser(UserPool.getCurrentUser());
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
              console.log({ session });
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

  const confirmRegistration = async (Username: string, code: string) =>
    await new Promise((resolve, reject) => {
      console.log({ Username });
      const user = new CognitoUser({
        Username,
        Pool: UserPool,
      });

      console.log("dodje li odje");

      user.confirmRegistration(code, true, (err, result) => {
        if (err) {
          console.log({ err });
          reject(err);
        }

        console.log({ result });

        resolve(result);
      });
    });

  const resendConfirmationCode = async (Username: string) =>
    await new Promise((resolve, reject) => {
      const user = new CognitoUser({
        Username,
        Pool: UserPool,
      });

      user.resendConfirmationCode((err, result) => {
        if (err) {
          reject(err);
        }

        resolve(result);
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
        confirmRegistration,
        resendConfirmationCode,
        getSession,
        logout,
        user: getUser(),
      }}
    >
      {children}
    </AuthorizationContext.Provider>
  );
};

export { Authorization, AuthorizationContext };
