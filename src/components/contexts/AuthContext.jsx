import { createContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import PropTypes from "prop-types";

const AuthContext = createContext({
   token: null,
});

function AuthProvider() {
   const [token, setToken] = useState(null);

   useEffect(() => {
      const storedToken = localStorage.getItem("token");

      setToken(storedToken);
   }, []);

   return (
      <AuthContext.Provider value={{ token, setToken }}>
         <Outlet />
      </AuthContext.Provider>
   );
}

AuthProvider.propTypes = {
   children: PropTypes.any,
};

export default AuthProvider;
export { AuthContext };
