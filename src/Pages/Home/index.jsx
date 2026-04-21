import { getPosts } from "../../API/posts";
import { useState, useEffect } from "react";
import { Post } from "../../Components/Post";
import "./home.css";
import { Link } from "react-router-dom";
import PostDetail from "../postdetail";

function HomePage() {
  const [post, setPost] = useState([]);
  useEffect(() => {
    getPosts().then((res) => setPost(res));
  }, []);
  return post.length === 0 ? (
    <>
      <div className="post-list">
        <h1>loadu...</h1>
      </div>
    </>
  ) : (
    <>
      <div className="post-list">
        my name is shreya
        {post.map((n) => {
          return (
            <Link
              key={n.id}
              to={`/post/${n.id}`}
              style={{ textDecoration: "none" }}
            >
              <Post post={n} />
            </Link>
          );
        })}
      </div>
    </>
  );
}
export default HomePage;
