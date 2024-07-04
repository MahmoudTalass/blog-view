import { useCallback } from "react";
import useAuthContext from "./useAuthContext";
import { Navigate } from "react-router-dom";

function useLogout() {
   const { setToken, setUserId } = useAuthContext();

   const logout = useCallback(() => {
      localStorage.removeItem("token");
      setToken(null);
      setUserId(null);

      return <Navigate to="/" />;
   }, [setToken, setUserId]);

   return logout;
}

export default useLogout;
