import { useState } from "react";
import useLogout from "./useLogout";

function usePostComment(commentsDispatch) {
   const logout = useLogout();
   const [error, setError] = useState(null);

   async function postComment(postId, commentText, setCommentText) {
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
            logout();
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

   return [postComment, error, setError];
}

export default usePostComment;
