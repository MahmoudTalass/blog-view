import { useState } from "react";
import useLogout from "./useLogout";

function useUpdateComment(commentsDispatch) {
   const [error, setError] = useState(null);
   const logout = useLogout();

   async function handleUpdateComment(commentId, text) {
      try {
         const storedToken = localStorage.getItem("token");

         const body = {
            text,
         };
         const response = await fetch("http://localhost:3000/api/comments/" + commentId, {
            method: "put",
            headers: {
               "content-type": "application/json",
               authorization: "Bearer " + storedToken,
            },
            body: JSON.stringify(body),
         });

         let json;

         if (response.status === 401) {
            json = { error: { status: response.status, message: "Authentication required" } };
            logout();
         } else {
            json = await response.json();
         }

         if (!response.ok) {
            setError(json.error);
            return;
         }
         commentsDispatch({ type: "update", comment: json });
      } catch (err) {
         setError(err);
      }
   }

   return [handleUpdateComment, error, setError];
}

export default useUpdateComment;
