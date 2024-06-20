function commentsReducer(comments, action) {
   switch (action.type) {
      case "add": {
         return [action.comment, ...comments];
      }
      case "delete": {
         return comments.filter((comment) => comment.id != action.commentId);
      }
      case "update": {
         return comments.map((comment) => {
            if (comment.id === action.comment._id) {
               return action.comment;
            } else {
               return comment;
            }
         });
      }
      case "reset": {
         return [];
      }
      case "set": {
         return action.comments;
      }
      default: {
         throw Error("Unknown action: " + action.type);
      }
   }
}

export default commentsReducer;