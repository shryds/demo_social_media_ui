import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./Auth";
import { addLike, authGetPosts, getPosts, removeLike } from "../API/posts";
import { userPosts as _userPosts } from "../API/user";

export const PostContext = createContext();

export function PostProvider({ children }) {
  const [post, setPost] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const { isLoggedIn } = useContext(AuthContext);
  console.log(post, "some text with it");

  async function handleLike(e, id, post, setPost) {
    console.log("ts to cheack handlelike");
    console.log(post, id);
    e.stopPropagation();
    e.preventDefault();

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
  }

  useEffect(() => {
    console.log("this is isloggedin: ", isLoggedIn);
    if (isLoggedIn === null) {
      return;
    }
    const postsCall = isLoggedIn ? authGetPosts : getPosts;
    postsCall().then((res) => {
      console.log("ts actually() res: ", res);
      setPost(res);
    });
  }, [isLoggedIn]);

  useEffect(() => {
    console.log("in useeffect", isLoggedIn);
    if (isLoggedIn) _userPosts().then((res) => setUserPosts(res));
  }, [isLoggedIn]);
  console.log({ userPosts });
  return (
    <PostContext value={{ handleLike, post, setPost, userPosts, setUserPosts }}>
      {children}
    </PostContext>
  );
}
