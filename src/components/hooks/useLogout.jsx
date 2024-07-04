import { useCallback } from "react";
import useAuthContext from "./useAuthContext";
import { Navigate } from "react-router-dom";

function useLogout() {
   const { setToken, setUserId, setIsUserAuthor } = useAuthContext();

   const logout = useCallback(() => {
      localStorage.removeItem("token");
      setToken(null);
      setUserId(null);
      setIsUserAuthor(false);

      return <Navigate to="/" />;
   }, [setToken, setUserId, setIsUserAuthor]);

   return logout;
}

export default useLogout;
