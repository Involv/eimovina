import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthorizationContext } from "../modules/authentification/components/Authorization";

export const Nav = () => {
  const { logout, user } = useContext(AuthorizationContext);

  return (
    <div className="bg-gray-700 p-6 flex justify-between items-center">
      <span className="font-light text-2xl mb-2 text-white">E-Imovina</span>
      {!user ? (
        <Link className="text-blue-300 font-bold cursor-pointer" to="login">
          ULOGUJ SE
        </Link>
      ) : (
        <div
          className="text-blue-300 font-bold cursor-pointer"
          onClick={() => logout()}
        >
          IZLOGUJ SE
        </div>
      )}
    </div>
  );
};
