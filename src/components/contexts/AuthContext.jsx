import { createContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext({
   token: null,
   userId: null,
});

function AuthProvider() {
   const [token, setToken] = useState(null);
   const [userId, setUserId] = useState(null);

   useEffect(() => {
      const storedToken = localStorage.getItem("token");
      const id = jwtDecode(storedToken).id;

      setToken(storedToken);
      setUserId(id);
   }, []);

   return (
      <AuthContext.Provider value={{ token, setToken, userId, setUserId }}>
         <Outlet />
      </AuthContext.Provider>
   );
}

AuthProvider.propTypes = {
   children: PropTypes.any,
};

export default AuthProvider;
export { AuthContext };
