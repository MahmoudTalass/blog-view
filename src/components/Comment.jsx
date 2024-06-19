import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import moment from "moment";

function Comment({ comment }) {
   return (
      <div className="flex gap-4 items-center">
         <div className="rounded-full bg-slate-400 p-2">
            <FontAwesomeIcon icon={faUser} size="xl" />
         </div>
         <div className="flex-grow">
            <div className="flex justify-between">
               <p>{comment.author.name}</p>
               <p className="text-sm">{moment(comment.createdAt).fromNow()}</p>
            </div>
            <p>{comment.text}</p>
         </div>
      </div>
   );
}

export default Comment;
