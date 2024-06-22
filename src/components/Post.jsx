import { Navigate, useParams } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import { useEffect, useState, useReducer } from "react";
import CommentSection from "./CommentSection";
import commentsReducer from "./reducers/commentsReducer";
import useLogout from "./hooks/useLogout";
import moment from "moment";

function Post() {
   const { token } = useAuth();
   const { postId } = useParams();
   const [error, setError] = useState(null);
   const [isLoading, setIsLoading] = useState(true);
   const [post, setPost] = useState(null);
   const [comments, commentsDispatch] = useReducer(commentsReducer, []);
   const logout = useLogout();

   useEffect(() => {
      let active = true;

      async function fetchData() {
         try {
            const storedToken = localStorage.getItem("token");

            const response = await fetch("http://localhost:3000/api/posts/" + postId, {
               method: "get",
               headers: {
                  authorization: "Bearer " + storedToken,
               },
            });

            if (response.status === 401) {
               setPost(null);
               commentsDispatch({ type: "reset" });
               logout();
               throw new Error("Authentication required");
            }

            if (response.status === 404) {
               throw new Error("Post not found");
            }
            const json = await response.json();

            if (!response.ok) {
               throw new Error(`Unexpected error! please try again later.`);
            }

            if (active) {
               setError(null);
               setPost(json.post);
               commentsDispatch({ type: "set", comments: json.comments });
            }
         } catch (err) {
            setError(err);
         } finally {
            if (active) {
               setIsLoading(false);
            }
         }
      }
      fetchData();

      return () => {
         active = false;
      };
   }, [postId, logout]);

   if (!token) {
      return <Navigate to="/login" replace={true} />;
   }

   if (isLoading) {
      return <p>Loading...</p>;
   }

   if (error) {
      return (
         <div className="h-[500px] w-full flex justify-center items-center">
            <p className="text-2xl">{error.message}</p>
         </div>
      );
   }

   return (
      <main className="w-full flex flex-col items-center">
         <section className="w-full sm:w-9/12 flex flex-col bg-[#1C2833] p-8 gap-12 rounded-xl ">
            <div className="flex flex-col gap-8">
               <h2 className="text-center sm:text-left text-3xl">{post.title}</h2>
               <div className="flex justify-between">
                  <p>{post.author.name}</p>
                  <p>{moment(post.publishDate).format("ll")}</p>
               </div>
               <p className="text-lg">{post.text}</p>
            </div>
            <CommentSection comments={comments} commentsDispatch={commentsDispatch} />
         </section>
      </main>
   );
}

export default Post;
