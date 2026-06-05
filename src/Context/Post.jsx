import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./Auth";
import {
  addLike,
  authGetPosts,
  deletePost,
  getPosts,
  removeLike,
} from "../API/posts";
import { userPosts as _userPosts } from "../API/user";

export const PostContext = createContext();

export function PostProvider({ children }) {
  const [post, setPost] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const { isLoggedIn } = useContext(AuthContext);

  async function handleLike(e, id, post, setPost) {
    e.stopPropagation();
    e.preventDefault();

    try {
      if (post.find((it) => it.id === id).isLiked) {
        await removeLike(id);
      } else {
        await addLike(id);
      }
      const updatedPost = post.map((it) =>
        it.id === id
          ? {
              ...it,
              likes: it.isLiked ? it.likes - 1 : it.likes + 1,
              isLiked: !it.isLiked,
            }
          : it,
      );
      setPost(updatedPost);
    } catch (err) {
      console.error(`Failed to update like for post ${id}:`, err);
    }
  }

  async function handleDeletePost(e, id) {
    e?.stopPropagation();
    e?.preventDefault();

    try {
      await deletePost(id);
      setPost((prev) => prev.filter((p) => p.id !== id));
      setUserPosts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error(`Failed to delete post ${id}:`, err);
    }
  }

  useEffect(() => {
    if (isLoggedIn === null) {
      return;
    }
    refreshPosts();
  }, [isLoggedIn]);

  function refreshPosts() {
    const postsCall = isLoggedIn ? authGetPosts : getPosts;
    postsCall()
      .then((res) => setPost(res))
      .catch((err) => console.error("Failed to load posts:", err));
    if (isLoggedIn) {
      _userPosts()
        .then((res) => setUserPosts(res))
        .catch((err) => console.error("Failed to load user posts:", err));
    }
  }
  return (
    <PostContext
      value={{
        handleLike,
        handleDeletePost,
        post,
        setPost,
        userPosts,
        setUserPosts,
        refreshPosts,
      }}
    >
      {children}
    </PostContext>
  );
}
