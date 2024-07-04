import { Navigate, useParams } from "react-router-dom";
import useAuthContext from "./hooks/useAuthContext";
import { useEffect, useState, useReducer } from "react";
import CommentSection from "./CommentSection";
import commentsReducer from "./reducers/commentsReducer";
import useLogout from "./hooks/useLogout";
import moment from "moment";
import { decode } from "he";
import DOMPurify from "dompurify";
import { Spinner } from "./Spinner";

function Post() {
   const { token } = useAuthContext();
   const { postId } = useParams();
   const [error, setError] = useState(null);
   const [isLoading, setIsLoading] = useState(true);
   const [post, setPost] = useState(null);
   const [comments, commentsDispatch] = useReducer(commentsReducer, []);
   const logout = useLogout();

   useEffect(() => {
      setIsLoading(true);
      const controller = new AbortController();

      async function fetchData() {
         try {
            const storedToken = localStorage.getItem("token");

            const response = await fetch(
               `https://blog-api-service.fly.dev/api/posts/${postId}?comments=true`,
               {
                  headers: {
                     Authorization: "Bearer " + storedToken,
                  },
                  signal: controller.signal,
               }
            );

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

            setError(null);
            setPost(json.post);
            commentsDispatch({ type: "set", comments: json.comments });
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
   }, [postId, logout]);

   if (!token) {
      return <Navigate to="/login" replace={true} />;
   }

   if (error) {
      return (
         <div className="h-[500px] w-full flex justify-center items-center">
            <p className="text-2xl">{error.message}</p>
         </div>
      );
   }

   if (isLoading || !post) {
      return <Spinner />;
   }

   const decodedText = decode(post.text);
   const sanitizedText = DOMPurify.sanitize(decodedText);

   const decodedTitle = decode(post.title);

   return (
      <main className="w-full flex flex-col items-center mb-12">
         <section className="w-full sm:w-9/12 flex flex-col bg-[#1C2833] p-8 gap-12 rounded-xl ">
            <div className="flex flex-col gap-8">
               <h2 className="text-center sm:text-left text-3xl">{decodedTitle}</h2>
               <div className="flex justify-between">
                  <p>By: {post.author.name}</p>
                  <p>{moment(post.publishDate).format("ll")}</p>
               </div>
               <div
                  className="p-4 prose prose-invert"
                  dangerouslySetInnerHTML={{ __html: sanitizedText }}
               ></div>
            </div>
            <CommentSection comments={comments} commentsDispatch={commentsDispatch} />
         </section>
      </main>
   );
}

export default Post;
