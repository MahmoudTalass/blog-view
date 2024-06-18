import { createContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import PropTypes from "prop-types";

const AuthContext = createContext({
   user: null,
   token: null,
});

function AuthProvider() {
   const [token, setToken] = useState(null);
   const [user, setUser] = useState(null);

   console.log("auth user:", user);
   useEffect(() => {
      const storedToken = localStorage.getItem("token");

      setToken(storedToken);
   }, []);

   return (
      <AuthContext.Provider value={{ token, setToken, user, setUser }}>
         <Outlet />
      </AuthContext.Provider>
   );
}

AuthProvider.propTypes = {
   children: PropTypes.any,
};

export default AuthProvider;
export { AuthContext };
