import { Link } from "react-router-dom";

export function NotFoundPage() {
   return (
      <div className="w-full">
         <div className="flex flex-col gap-4 mx-auto w-fit mt-32 bg-color1 p-6 rounded-md">
            <h1 className="text-4xl">Page not found.</h1>
            <p className="text-xl">
               Go back to the{" "}
               <Link className="underline" to="/">
                  home page.
               </Link>
            </p>
         </div>
      </div>
   );
}
