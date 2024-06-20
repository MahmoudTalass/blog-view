import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import useOutsideClick from "./hooks/useOutsideClick";
import useDeleteComment from "./hooks/useDeleteComment";

function Comment({ comment, isCurrentUserComment, commentsDispatch }) {
   const [displayOptions, setDisplayOptions] = useState(false);
   const commentOptionsRef = useRef(null);
   const [handleDeleteComment, deleteError, setDeleteError] = useDeleteComment(commentsDispatch);
   useOutsideClick(commentOptionsRef, setDisplayOptions);

   useEffect(() => {
      setDisplayOptions(false);
      const timeoutId = setTimeout(() => {
         setDeleteError(null);
      }, 3000);

      return () => clearTimeout(timeoutId);
   }, [deleteError, setDeleteError]);

   return (
      <>
         <div className="flex gap-4 items-center">
            <div className="rounded-full bg-slate-400 p-2">
               <FontAwesomeIcon icon={faUser} size="xl" />
            </div>
            <div className="flex-grow">
               <div className="flex items-center gap-2">
                  <p>{comment.author.name}</p>
                  <p className="text-sm text-gray-400">{moment(comment.createdAt).fromNow()}</p>
               </div>
               <p>{comment.text}</p>
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
                        className="flex flex-col bg-[#8A897C] rounded   absolute right-0 z-10 p-1 px-3 gap-1"
                        role="menu"
                        ref={commentOptionsRef}
                     >
                        <button role="menuitem">Edit</button>
                        <hr />
                        <button role="menuitem" onClick={() => handleDeleteComment(comment)}>
                           Delete
                        </button>
                     </div>
                  )}
               </div>
            )}
         </div>
         {deleteError && <p>{deleteError.message}</p>}
      </>
   );
}

export default Comment;
