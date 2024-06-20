import { useState } from "react";

function useDeleteComment(commentsDispatch) {
   const [error, setError] = useState(null);

   async function handleDeleteComment(commentId, authorId) {
      try {
         const storedToken = localStorage.getItem("token");

         const response = await fetch("http://localhost:3000/api/comments/" + commentId, {
            method: "delete",
            headers: {
               "content-type": "application/json",
               authorization: "Bearer " + storedToken,
            },
            body: JSON.stringify({ authorId }),
         });

         if (!response.ok) {
            const json = await response.json();
            setError(json.error);
            return;
         }

         commentsDispatch({ type: "delete", commentId });
         setError(null);
      } catch (err) {
         setError(err);
      }
   }

   return [handleDeleteComment, error, setError];
}

export default useDeleteComment;
