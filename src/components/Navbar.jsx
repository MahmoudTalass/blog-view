import { Link } from "react-router-dom";
import useAuth from "./hooks/useAuth";

function Navbar() {
   const { token, setToken, setUserId } = useAuth();

   function logout() {
      setToken(null);
      setUserId(null);
      localStorage.removeItem("token");
   }

   return (
      <header className="flex justify-between p-6 mb-10 bg-[#34495E]">
         <Link to="/">
            <h1 className="text-4xl font-bold">Blog View</h1>
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
