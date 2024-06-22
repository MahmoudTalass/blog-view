import { useCallback } from "react";
import useAuth from "./useAuth";
import { Navigate } from "react-router-dom";

function useLogout() {
   const { setToken, setUserId } = useAuth();

   const logout = useCallback(() => {
      localStorage.removeItem("token");
      setToken(null);
      setUserId(null);

      return <Navigate to="/" />;
   }, [setToken, setUserId]);

   return logout;
}

export default useLogout;
