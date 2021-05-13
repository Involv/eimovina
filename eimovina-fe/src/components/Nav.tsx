import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthorizationContext } from "../modules/authentification/components/Authorization";
import { NavTabs } from "./NavTabs";

export const Nav = () => {
  const { logout, user } = useContext(AuthorizationContext);

  return (
    <div className="bg-gray-700 px-5 lg:px-8 py-6">
      <div className="flex justify-between items-center">
        <Link className="font-light text-2xl text-white" to="/">
          E-Imovina
        </Link>
        {!user ? (
          <Link className="text-blue-300 font-bold cursor-pointer" to="/login">
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
      {user && (
        <div className="mt-4">
          <NavTabs />
        </div>
      )}
    </div>
  );
};
