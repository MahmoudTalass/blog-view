import { useEffect, useRef, useState } from "react";

// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";

// custom hooks
import useOutsideClick from "./hooks/useOutsideClick";
import UseDeleteComment from "./hooks/useDeleteComment";
import useUpdateComment from "./hooks/useUpdateComment";

// prop type checking
import PropTypes from "prop-types";

// time/date formatting
import moment from "moment";
import useAuthContext from "./hooks/useAuthContext";
import { decode } from "he";

function Comment({ comment, isCurrentUserComment, commentsDispatch }) {
   // toggle display state
   const [displayOptions, setDisplayOptions] = useState(false); // handles displaying the options tools for a comment (delete/edit)
   const [isEditing, setIsEditing] = useState(false); // handles displaying the input field for editing a comment

   // DOM ref
   const commentOptionsRef = useRef(null);

   // custom state for performing update/delete actions on a comment
   const [handleDeleteComment, deleteError, setDeleteError] = UseDeleteComment(commentsDispatch);
   const [handleUpdateComment, updateError, setUpdateError] = useUpdateComment(commentsDispatch);

   // Hook to handle hiding an element when clicking outside the element
   useOutsideClick(commentOptionsRef, setDisplayOptions);

   // state for text that the user will type to update/edit their comment
   const [commentInput, setCommentInput] = useState(comment.text);

   const { userId } = useAuthContext();

   useEffect(() => {
      setDisplayOptions(false);
      const timeoutId = setTimeout(() => {
         setDeleteError(null);
      }, 3000);

      return () => clearTimeout(timeoutId);
   }, [deleteError, setDeleteError, updateError, setUpdateError]);

   function handleDisplayEditing() {
      setCommentInput(comment.text);
      setIsEditing(true);
      setDisplayOptions(false);
      setUpdateError(null);
   }

   async function handleSaveUpdate() {
      await handleUpdateComment(comment._id, commentInput);
      if (!updateError) {
         setIsEditing(false);
      }
   }

   const decodedCommentText = decode(comment.text);

   return (
      <>
         <div className="flex gap-4 items-center bg-color3 p-2 rounded-lg">
            {isEditing && (
               <div className="flex flex-col gap-2 flex-grow">
                  <input
                     type="text"
                     placeholder="comment..."
                     className="w-full bg-inherit outline-none border-b"
                     value={commentInput}
                     onChange={(e) => setCommentInput(e.target.value)}
                  />
                  <div className="flex gap-2 justify-end">
                     <button
                        className={"border rounded-full px-4 py-2 w-min text-sm"}
                        title="cancel"
                        onClick={() => setIsEditing(false)}
                     >
                        cancel
                     </button>
                     <button
                        disabled={commentInput.length === 0}
                        className={`opacity-${
                           commentInput.length === 0 ? "10" : "100"
                        } border rounded-full px-4 py-2 w-min text-sm`}
                        title="save"
                        onClick={() => handleSaveUpdate()}
                     >
                        save
                     </button>
                  </div>
                  <div>
                     {updateError &&
                        updateError.errors.length !== 0 &&
                        updateError.errors.map((err) => {
                           return (
                              <p key={err.message} className="text-red-600">
                                 {err.message}
                              </p>
                           );
                        })}
                  </div>
               </div>
            )}
            {!isEditing && (
               <>
                  <div className="flex-grow flex flex-col gap-1">
                     <div className="flex flex-col">
                        <p className="font-bold">
                           {comment.author.name}
                           {comment.author._id === userId && <span className="italic"> (You)</span>}
                        </p>
                        <p className="text-sm text-gray-400">
                           {moment(comment.createdAt).fromNow()}
                        </p>
                     </div>
                     <p>{decodedCommentText}</p>
                  </div>
                  {isCurrentUserComment && (
                     <div className="relative">
                        <button
                           onClick={() => setDisplayOptions(!displayOptions)}
                           aria-haspopup="true"
                           aria-expanded={displayOptions}
                        >
                           <FontAwesomeIcon icon={faEllipsisVertical} />
                        </button>
                        {displayOptions && (
                           <div
                              className="flex flex-col bg-color2 rounded absolute right-0 z-10 p-1 px-3 gap-1 divide-y"
                              role="menu"
                              ref={commentOptionsRef}
                           >
                              <button role="menuitem" onClick={handleDisplayEditing}>
                                 Edit
                              </button>
                              {/* <hr /> */}
                              <button
                                 role="menuitem"
                                 onClick={() => handleDeleteComment(comment._id)}
                              >
                                 Delete
                              </button>
                           </div>
                        )}
                     </div>
                  )}
               </>
            )}
         </div>

         {deleteError && <p>{deleteError.message}</p>}
      </>
   );
}

Comment.propTypes = {
   comment: PropTypes.object,
   isCurrentUserComment: PropTypes.bool,
   commentsDispatch: PropTypes.func,
};

export default Comment;
