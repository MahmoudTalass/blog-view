import { Link } from "react-router-dom";

function NotFound() {
   return (
      <div className="p-5 flex flex-col gap-4">
         <h2 className="text-3xl">Page not found! </h2>
         <p className="text-2xl">
            Go back to the{" "}
            <Link to="/" className="underline">
               homepage
            </Link>
            .
         </p>
      </div>
   );
}

export default NotFound;
