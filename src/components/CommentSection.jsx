import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Comment from "./Comment";
import { useParams } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import PropTypes from "prop-types";
import usePostComment from "./hooks/usePostComment";

function CommentSection({ comments, commentsDispatch }) {
   const [commentText, setCommentText] = useState("");
   const { postId } = useParams();
   const { userId } = useAuth();
   const [handlePostComment, error] = usePostComment(commentsDispatch);

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
               onClick={() => handlePostComment(postId, commentText, setCommentText)}
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
