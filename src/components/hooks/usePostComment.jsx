import { useState } from "react";
import useAuth from "./useAuth";

function usePostComment(commentsDispatch) {
   const { setToken, setUserId } = useAuth();

   const [error, setError] = useState(null);

   async function handlePostComment(postId, commentText, setCommentText) {
      try {
         const storedToken = localStorage.getItem("token");

         const body = {
            text: commentText,
            postId,
         };

         const response = await fetch("http://localhost:3000/api/comments", {
            method: "post",
            headers: {
               "content-type": "application/json",
               authorization: "Bearer " + storedToken,
            },
            body: JSON.stringify(body),
         });

         let json;

         if (response.status === 401) {
            json = { error: { status: response.status, message: "Authentication required" } };
            commentsDispatch({ type: "reset" });
            setToken(null);
            setUserId(null);
            localStorage.removeItem("token");
         } else {
            json = await response.json();
         }

         if (!response.ok) {
            setError(json.error);
            return;
         }

         setError(null);
         commentsDispatch({ type: "add", comment: json });
         setCommentText("");
      } catch (err) {
         setError(err);
      }
   }

   return [handlePostComment, error];
}

export default usePostComment;