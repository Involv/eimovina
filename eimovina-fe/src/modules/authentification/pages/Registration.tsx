import React, { useContext, useState } from "react";
import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import { UserPool } from "../../../aws/UserPool";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { AuthorizationContext } from "../components/Authorization";

export const Registration = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);

  const { addToast } = useToasts();

  const { confirmRegistration, resendConfirmationCode } =
    useContext(AuthorizationContext);

  const attributeName = new CognitoUserAttribute({ Name: "name", Value: name });

  const hanldeSumbit = (event: React.FormEvent) => {
    event.preventDefault();
    UserPool.signUp(email, password, [attributeName], [], (err, data) => {
      if (err) {
        console.log(err);
        addToast(err.message, {
          appearance: "error",
          placement: "bottom-center",
          autoDismiss: true,
          autoDismissTimeout: 3000,
        });
        return;
      }

      if (data) {
        console.log({ data });
        setIsRegistered(true);
      }
    });
  };

  const handleOnConfirm = () => {
    console.log({ email });
    console.log({ code });
    confirmRegistration(email, code)
      .then(() => {
        console.log("Success");
        setIsConfirmed(true);
      })
      .catch((err) => {
        console.log(err);
        addToast(err.message, {
          appearance: "error",
          placement: "bottom-center",
          autoDismiss: true,
          autoDismissTimeout: 3000,
        });
      });
  };

  const resendCode = () => {
    resendConfirmationCode(email)
      .then(() => {
        setCode("");
        addToast("Verification code is sent. Check your email", {
          placement: "bottom-center",
          autoDismiss: true,
          autoDismissTimeout: 3000,
        });
      })
      .catch((err) => {
        console.log(err);
        addToast(err.message, {
          appearance: "error",
          placement: "bottom-center",
          autoDismiss: true,
          autoDismissTimeout: 3000,
        });
      });
  };

  return (
    <div className="h-full flex items-center justify-center column flex-col	">
      <div className="max-w-md rounded overflow-hidden shadow-lg p-6 bg-white">
        <div className="text-3xl font-light tracking-wide text-center">
          EImovina Registration
        </div>
        {!isRegistered && (
          <div>
            <label className="block">
              <span className="text-gray-700">Name</span>
              <input
                className="w-full border-gray-300 rounded-lg shadow-sm"
                placeholder="Enter name"
                name="name"
                id="name"
                type="text"
                value={name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setName(e.target.value)
                }
              />
            </label>

            <label className="block mt-4">
              <span className="text-gray-700">Email</span>
              <input
                className="w-full border-gray-300 rounded-lg shadow-sm"
                placeholder="Enter email"
                name="email"
                id="email"
                type="text"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
              />
            </label>

            <label className="block mt-4">
              <span className="text-gray-700">Password</span>
              <input
                className="w-full border-gray-300 rounded-lg shadow-sm"
                placeholder="Enter password"
                name="password"
                id="password"
                type="password"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
              />
            </label>
          </div>
        )}
        {isRegistered && (
          <label className="block mt-4">
            <span className="text-gray-700">Code</span>
            <input
              className="w-full border-gray-300 rounded-lg shadow-sm"
              placeholder="Enter code"
              name="code"
              id="code"
              type="text"
              value={code}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setCode(e.target.value)
              }
            />
            <div
              onClick={resendCode}
              className="text-gray-400 text-sm cursor-pointer text-right mt-2"
            >
              Resend code?
            </div>
          </label>
        )}

        {!isRegistered && (
          <button
            type="submit"
            onClick={hanldeSumbit}
            disabled={!name || !email || !password}
            className="my-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
          >
            Register
          </button>
        )}

        {isRegistered && (
          <button
            onClick={handleOnConfirm}
            disabled={!code}
            className="my-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
          >
            Confirm Code
          </button>
        )}

        <Link to="login" className="text-blue-500 cursor-pointer">
          Got to Login
        </Link>
      </div>

      {isRegistered && !isConfirmed && (
        <div className="text-green-400 mt-6">
          Verification code is sent on you email.
        </div>
      )}

      {isConfirmed && (
        <div className="text-green-400 mt-6">
          Your account is verified successfully! You can continue with Login.
        </div>
      )}
    </div>
  );
};
