import PostCard from "./PostCard";
import { Spinner } from "./Spinner";
import { useFetch } from "./hooks/useFetch";
function Home() {
   const { data, isLoading, error } = useFetch("http://localhost:3000/api/posts");

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
