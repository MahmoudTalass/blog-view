import { useCallback } from "react";
import useAuth from "./useAuth";

function useLogout() {
   const { setToken, setUserId } = useAuth();

   const logout = useCallback(() => {
      localStorage.removeItem("token");
      setToken(null);
      setUserId(null);
   }, [setToken, setUserId]);

   return logout;
}

export default useLogout;
