import moment from "moment";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function PostCard({ post }) {
   return (
      <Link to={`/post/${post._id}`}>
         <article className="flex flex-col gap-3 w-[500px] w-min-[300px] h-[200px] p-3 bg-color2 justify-between items-center">
            <h3 className="text-3xl flex-grow flex items-center justify-center">{post.title}</h3>
            <div className="flex justify-between gap-3 w-full">
               <p className="">By: {post.author.name}</p>
               <p className="">{moment(post.publishDate).format("LLL")}</p>
            </div>
         </article>
      </Link>
   );
}

PostCard.propTypes = {
   post: PropTypes.object,
};
export default PostCard;
