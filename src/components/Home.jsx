import PostCard from "./PostCard";
import { useState, useEffect } from "react";
import { Spinner } from "./Spinner";
function Home() {
   const [data, setData] = useState(null);
   const [error, setError] = useState(null);
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      const controller = new AbortController();

      async function fetchData() {
         try {
            const response = await fetch("http://localhost:3000/api/posts", {
               signal: controller.signal,
            });
            const json = await response.json();

            if (!response.ok) {
               setData(null);
               throw new Error(json.error.message);
            }

            setError(null);
            setData(json);
         } catch (err) {
            if (err.name !== "AbortError") {
               setError(err);
            }
         } finally {
            setIsLoading(false);
         }
      }

      fetchData();

      return () => {
         controller.abort();
      };
   }, []);

   if (isLoading || !data) {
      return <Spinner />;
   }

   if (error) {
      return <div className="w-full text-center">{error.message}</div>;
   }

   return (
      <div className="max-w-1200px">
         <section className="flex flex-wrap w-full gap-5 p-6 justify-center">
            {data &&
               (data.length > 0 ? (
                  data.map((post) => {
                     return <PostCard key={post._id} post={post} />;
                  })
               ) : (
                  <p>No posts yet</p>
               ))}
         </section>
      </div>
   );
}

export default Home;
