import { useState } from "react";

function useDeleteComment(commentsDispatch) {
   const [error, setError] = useState(null);

   async function handleDeleteComment(commentId) {
      try {
         const storedToken = localStorage.getItem("token");

         const response = await fetch("http://localhost:3000/api/comments/" + commentId, {
            method: "delete",
            headers: {
               "content-type": "application/json",
               authorization: "Bearer " + storedToken,
            },
            body: JSON.stringify({ authorId: comment.author._id }),
         });

         if (!response.ok) {
            const json = await response.json();
            setError(json.error);
            return;
         }

         commentsDispatch({ type: "delete", commentId: comment._id });
         setError(null);
      } catch (err) {
         setError(err);
      }
   }

   return [handleDeleteComment, error, setError];
}

export default useDeleteComment;
