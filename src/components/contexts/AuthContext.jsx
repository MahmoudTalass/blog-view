import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

const AuthContext = createContext({
   user: null,
   token: null,
});

function AuthProvider({ children }) {
   const [token, setToken] = useState(null);
   const [user, setUser] = useState(null);

   useEffect(() => {
      const storedToken = localStorage.getItem("token");

      setToken(storedToken);
   }, []);

   return (
      <AuthContext.Provider value={{ token, setToken, user, setUser }}>
         {children}
      </AuthContext.Provider>
   );
}

AuthProvider.propTypes = {
   children: PropTypes.any,
};

export default AuthProvider;
export { AuthContext };
