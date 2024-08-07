import { useState } from "react";
import useLogout from "./useLogout";

function UseDeleteComment(commentsDispatch) {
   const [error, setError] = useState(null);
   const logout = useLogout();

   async function handleDeleteComment(commentId) {
      try {
         const storedToken = localStorage.getItem("token");

         const response = await fetch(
            "https://blog-api-service.fly.dev/api/comments/" + commentId,
            {
               method: "delete",
               headers: {
                  "content-type": "application/json",
                  authorization: "Bearer " + storedToken,
               },
            }
         );

         if (!response.ok) {
            let json;
            if (response.status === 401) {
               json = { error: { status: response.status, message: "Authentication required" } };
               logout();
            } else {
               json = await response.json();
            }
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

export default UseDeleteComment;
