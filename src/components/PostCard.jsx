import moment from "moment";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { decode } from "he";

function PostCard({ post }) {
   const decodedTitle = decode(post.title);

   return (
      <Link to={`/post/${post._id}`}>
         <article className="flex flex-col gap-5 w-[500px] w-min-[300px] p-5 bg-color1 rounded-lg">
            <h3 className="text-3xl ">{decodedTitle}</h3>
            <p className="">By: {post.author.name}</p>
            <p className="text-right">{moment(post.publishDate).format("LLL")}</p>
         </article>
      </Link>
   );
}

PostCard.propTypes = {
   post: PropTypes.object,
};
export default PostCard;
