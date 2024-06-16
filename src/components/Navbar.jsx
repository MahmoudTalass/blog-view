import { Link } from "react-router-dom";

function Navbar() {
   return (
      <header className="flex justify-between p-6">
         <h1 className="text-4xl">Blog View</h1>
         <nav className="flex gap-2 items-center">
            <Link to="login">Login</Link>
            <Link to="signup">Sign up</Link>
            <button>Logout</button>
         </nav>
      </header>
   );
}

export default Navbar;
