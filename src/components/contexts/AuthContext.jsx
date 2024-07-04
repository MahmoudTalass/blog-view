import { createContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext({
   token: null,
   userId: null,
});

function AuthProvider() {
   // this is used to avoid issues with token being null
   // on the first render until the useEffect runs and
   // retrieves the correct token from localStorage
   const getToken = () => localStorage.getItem("token");

   const [token, setToken] = useState(getToken);
   const [userId, setUserId] = useState(null);
   const [isUserAuthor, setIsUserAuthor] = useState(false);

   useEffect(() => {
      if (token) {
         const { id, author } = jwtDecode(token);

         setIsUserAuthor(author);
         setToken(token);
         setUserId(id);
      }
   }, [token]);

   return (
      <AuthContext.Provider
         value={{ token, setToken, userId, setUserId, setIsUserAuthor, isUserAuthor }}
      >
         <Outlet />
      </AuthContext.Provider>
   );
}

AuthProvider.propTypes = {
   children: PropTypes.any,
};

export default AuthProvider;
export { AuthContext };
