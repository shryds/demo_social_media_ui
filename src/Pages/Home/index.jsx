import { addLike, authGetPosts, getPosts, removeLike } from "../../API/posts";
import { useState, useEffect, useContext } from "react";
import { Post } from "../../Components/Post";
import "./home.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/Auth";

function HomePage() {
  
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
              <Post post={n} handleLike={handleLike} />
            </Link>
          );
        })}
      </div>
    </>
  );
}
export default HomePage;
