import { Navigate, useParams } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import { useEffect, useState, useReducer } from "react";
import CommentSection from "./CommentSection";
import commentsReducer from "./reducers/commentsReducer";
import useLogout from "./hooks/useLogout";

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

            let json;

            if (response.status === 401) {
               json = { error: { status: response.status, message: "Authentication required" } };
               setPost(null);
               commentsDispatch({ type: "reset" });
               logout();
            } else {
               json = await response.json();
            }

            if (!response.ok) {
               setError(json.error);
               return;
            }

            if (active) {
               setError(null);
               setPost(json.post);
               commentsDispatch({ type: "set", comments: json.comments });
            }
         } catch (err) {
            setError({ message: "Could not get the post, please try again later." });
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
            <p className="text-2xl">{error && error.message}</p>
         </div>
      );
   }

   return (
      <main className="w-full flex flex-col items-center">
         <section className="w-9/12 flex flex-col bg-color2 p-8 gap-12 rounded">
            <div className="flex flex-col gap-8">
               <h2 className="text-3xl">{post.title}</h2>
               <div className="flex justify-between">
                  <p>{post.author.name}</p>
                  <p>{post.publishDate}</p>
               </div>
               <p className="text-lg">{post.text}</p>
            </div>
            <CommentSection comments={comments} commentsDispatch={commentsDispatch} />
         </section>
      </main>
   );
}

export default Post;
