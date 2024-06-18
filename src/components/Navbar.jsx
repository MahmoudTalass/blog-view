import { Link } from "react-router-dom";
import useAuth from "./hooks/useAuth";

function Navbar() {
   const { token, setToken, setUser } = useAuth();

   function logout() {
      setToken(null);
      setUser(null);
      localStorage.removeItem("token");
   }

   return (
      <header className="flex justify-between p-6 mb-16">
         <Link to="/">
            <h1 className="text-4xl">Blog View</h1>
         </Link>
         <nav className="flex gap-6 items-center">
            {token ? (
               <button onClick={logout}>Logout</button>
            ) : (
               <>
                  <Link to="login">Login</Link>
                  <Link to="signup">Sign up</Link>
               </>
            )}
         </nav>
      </header>
   );
}

export default Navbar;
