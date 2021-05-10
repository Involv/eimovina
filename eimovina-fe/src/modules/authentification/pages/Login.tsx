import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { AuthorizationContext } from "../components/Authorization";

export const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { authenticate } = useContext(AuthorizationContext);
  const history = useHistory();

  const { addToast } = useToasts();

  const hanldeSumbit = (event: React.FormEvent) => {
    event.preventDefault();

    authenticate(email, password)
      .then(() => {
        console.log("You are logged in");
        history.push("/");
      })
      .catch((err) => {
        console.log("Error on Log In: ", err);
        addToast(err.message, {
          appearance: "error",
          autoDismiss: true,
          autoDismissTimeout: 3000,
          placement: "bottom-center",
        });
      });
  };

  return (
    <div className="h-full flex items-center justify-center">
      <form
        onSubmit={hanldeSumbit}
        className="max-w-md rounded overflow-hidden shadow-lg p-6"
      >
        <div className="text-3xl font-light tracking-wide text-center">
          EImovina Log In
        </div>

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
          Log In
        </button>

        <Link to="register" className="text-blue-500 cursor-pointer">
          Don't have an account yet? Sign Up
        </Link>
      </form>
    </div>
  );
};
