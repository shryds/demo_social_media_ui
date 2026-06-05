import { useContext } from "react";
import { Post } from "../../Components/Post";
import "./home.css";
import { Link } from "react-router-dom";
import { PostContext } from "../../Context/Post";

function HomePage() {
  const { post, setPost, handleLike, handleDeletePost } =
    useContext(PostContext);

  return post.length === 0 ? (
    <p className="loading">Loading...</p>
  ) : (
    <>
      <div className="post-list">
        {post.map((n) => {
          return (
            <Link
              key={n.id}
              to={`/post/${n.id}`}
              style={{ textDecoration: "none" }}
            >
              <Post
                post={n}
                handleLike={(e, id) => handleLike(e, id, post, setPost)}
                onDelete={handleDeletePost}
              />
            </Link>
          );
        })}
      </div>
    </>
  );
}
export default HomePage;
