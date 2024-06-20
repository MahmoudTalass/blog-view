import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Comment from "./Comment";
import { useParams } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import PropTypes from "prop-types";

function CommentSection({ comments, dispatch }) {
   const [commentText, setCommentText] = useState("");
   const { postId } = useParams();
   const [error, setError] = useState(null);
   const { setToken, setUserId, userId } = useAuth();

   async function handlePostComment() {
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
            dispatch({ type: "reset" });
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
         dispatch({ type: "add", comment: json });
         setCommentText("");
      } catch (err) {
         setError(err);
      }
   }

   return (
      <section>
         <hr />
         <p className="text-2xl py-4">comments:</p>
         <hr />
         <br />
         <div className="flex gap-2 items-center mb-4 border-b pb-2">
            <input
               type="text"
               placeholder="comment..."
               className="w-full bg-inherit"
               value={commentText}
               onChange={(e) => setCommentText(e.target.value)}
            />
            <button
               disabled={commentText.length === 0}
               className={`opacity-${commentText.length === 0 ? "10" : "100"}`}
               title="post"
               onClick={handlePostComment}
            >
               <FontAwesomeIcon icon={faArrowRight} size="xl" />
            </button>
         </div>
         {error &&
            (error.errors.length === 0 ? (
               <p className="text-red">{error.message}</p>
            ) : (
               error.errors.map((err) => {
                  return (
                     <p key={err} className="text-red">
                        {err.message}
                     </p>
                  );
               })
            ))}
         <div className="flex flex-col gap-4">
            {comments.map((comment) => {
               return (
                  <Comment
                     key={comment._id}
                     comment={comment}
                     isCurrentUserComment={userId === comment.author._id}
                  />
               );
            })}
            {comments.length === 0 && <p>No comments yet</p>}
         </div>
      </section>
   );
}

CommentSection.propTypes = {
   comments: PropTypes.array,
   dispatch: PropTypes.func,
};

export default CommentSection;
