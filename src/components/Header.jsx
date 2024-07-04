import { Link } from "react-router-dom";
import useAuthContext from "./hooks/useAuthContext";
import useLogout from "./hooks/useLogout";

function Header() {
   const { token, isUserAuthor } = useAuthContext();
   const logout = useLogout();

   return (
      <header className="flex justify-between p-6 mb-10 bg-[#34495E]">
         <Link to="/">
            <h1 className="text-4xl font-bold">Blog View</h1>
         </Link>
         <nav className="flex gap-6 items-center">
            {isUserAuthor && <a href="https://authorhub.netlify.app">Create a post?</a>}
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

export default Header;
