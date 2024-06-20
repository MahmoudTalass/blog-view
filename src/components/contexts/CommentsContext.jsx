import { createContext, useContext, useReducer } from "react";
import commentsReducer from "../reducers/commentsReducer";

export const CommentsContext = createContext({
   comments: [],
   commentsDispatch: () => {},
});

function CommentsProvider({ children }) {
   const [comments, commentsDispatch] = useReducer(commentsReducer, []);

   return (
      <CommentsContext.Provider value={{ comments, commentsDispatch }}>
         {children}
      </CommentsContext.Provider>
   );
}

export default CommentsProvider;
