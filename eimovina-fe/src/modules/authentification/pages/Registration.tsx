import React, { useState } from "react";
import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import { UserPool } from "../../../aws/UserPool";
import { Link } from "react-router-dom";

export const Registration = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isRegistered, setIsRegistered] = useState<boolean>(false);

  const attributeName = new CognitoUserAttribute({ Name: "name", Value: name });

  const hanldeSumbit = (event: React.FormEvent) => {
    event.preventDefault();
    UserPool.signUp(email, password, [attributeName], [], (err, data) => {
      if (err) {
        console.log(err);
        return;
      }

      if (data) {
        console.log({ data });
        setIsRegistered(true);
      }
    });
  };

  return (
    <div className="h-full flex items-center justify-center column flex-col	">
      <form
        onSubmit={hanldeSumbit}
        className="max-w-md rounded overflow-hidden shadow-lg p-6"
      >
        <div className="text-3xl font-light tracking-wide text-center">
          EImovina Registration
        </div>
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

        <button
          type="submit"
          className="my-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
        >
          Register
        </button>

        <Link to="login" className="text-blue-500 cursor-pointer">
          Got to Login
        </Link>
      </form>

      {isRegistered && (
        <div className="text-green-400 mt-6">Check your email to continue!</div>
      )}
    </div>
  );
};
