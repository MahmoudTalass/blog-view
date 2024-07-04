import { useEffect, useState } from "react";
import Comment from "./Comment";
import { useParams } from "react-router-dom";
import useAuthContext from "./hooks/useAuthContext";
import PropTypes from "prop-types";
import usePostComment from "./hooks/usePostComment";

function CommentSection({ comments, commentsDispatch }) {
   const [commentInput, setCommentInput] = useState("");
   const { postId } = useParams();
   const { userId } = useAuthContext();
   const [postComment, error, setError] = usePostComment(commentsDispatch);

   useEffect(() => {
      const timeoutId = setTimeout(() => {
         setError(null);
      }, 4000);
      return () => clearTimeout(timeoutId);
   });

   function handlePostComment() {
      postComment(postId, commentInput, setCommentInput);
   }

   return (
      <section>
         <hr />
         <p className="text-2xl py-4 font-bold">comments:</p>
         <hr />
         <br />
         <div>
            <div className="flex gap-2 items-center mb-4">
               <input
                  type="text"
                  placeholder="Add a comment..."
                  className="flex-grow bg-[#2C3E50] p-2 rounded"
                  value={commentInput}
                  onChange={(e) => setCommentInput(e.target.value)}
               />
               <button
                  disabled={commentInput.length === 0}
                  className={`opacity-${
                     commentInput.length === 0 ? "10" : "100"
                  } bg-[#3498DB] py-2 px-5 rounded text-[#ECF0F1]`}
                  title="post"
                  onClick={() => handlePostComment()}
               >
                  Add comment
               </button>
            </div>
            {error && (
               <div className="mb-5">
                  {error.errors.length === 0 ? (
                     <p className="text-red-600">{error.message}</p>
                  ) : (
                     error.errors.map((err) => {
                        return (
                           <p key={err} className="text-red-600">
                              {err.message}
                           </p>
                        );
                     })
                  )}
               </div>
            )}
         </div>

         <div className="flex flex-col gap-4">
            {comments.map((comment) => {
               return (
                  <Comment
                     key={comment._id}
                     comment={comment}
                     isCurrentUserComment={userId === comment.author._id}
                     commentsDispatch={commentsDispatch}
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
   commentsDispatch: PropTypes.func,
};

export default CommentSection;
