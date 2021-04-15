import { useContext, useEffect, useState } from "react";
import { AuthorizationContext } from "../components/Authorization";

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const { getSession } = useContext(AuthorizationContext);

  useEffect(() => {
    getSession().then(() => setIsLoggedIn(true));
  }, []);

  return { isLoggedIn };
};
