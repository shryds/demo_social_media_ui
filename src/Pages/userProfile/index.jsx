import { useContext, useEffect, useState } from "react";
import { PostContext } from "../../Context/Post";
import { Link } from "react-router-dom";
import { Post } from "../../Components/Post";
import { userComments as _userComments } from "../../API/user";
import { deleteComment } from "../../API/posts";

export function UserProfile() {
  const { userPosts, setUserPosts, handleLike, handleDeletePost } =
    useContext(PostContext);
  const [view, setView] = useState("posts");
  const [userComments, setUserComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(true);

  useEffect(() => {
    _userComments()
      .then((res) => setUserComments(res))
      .catch(() => {})
      .finally(() => setLoadingComments(false));
  }, []);

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(commentId);
      setUserComments((prev) => prev.filter((c) => c.id !== commentId));
    } catch (err) {
      console.error(`Failed to delete comment ${commentId}:`, err);
    }
  };

  const renderUserComments = () => {
    if (loadingComments) {
      return <p className="loading">Loading...</p>;
    }
    if (userComments.length === 0) {
      return <p className="empty">No comments yet.</p>;
    }
    return (
      <div className="comment-list">
        {userComments.map((c) => (
          <div key={c.id} className="card comment">
            <div className="comment-header">
              <p className="comment-author">{c.user.email}</p>
              <button
                className="btn-danger btn-sm hover-action"
                onClick={() => handleDeleteComment(c.id)}
              >
                Delete
              </button>
            </div>
            <p>{c.comment}</p>
          </div>
        ))}
      </div>
    );
  };

  const renderUserPosts = () => {
    if (userPosts.length === 0) {
      return <p className="empty">No posts yet.</p>;
    }
    return (
      <div className="post-list">
        {userPosts.map((n) => {
          return (
            <Link
              key={n.id}
              to={`/post/${n.id}`}
              style={{ textDecoration: "none" }}
            >
              <Post
                post={n}
                handleLike={(e, id) =>
                  handleLike(e, id, userPosts, setUserPosts)
                }
                onDelete={handleDeletePost}
                canDelete
              />
            </Link>
          );
        })}
      </div>
    );
  };

  return (
    <div className="page">
      <div className="profile-tabs">
        <button
          className={view === "posts" ? "tab active" : "tab"}
          onClick={() => setView("posts")}
        >
          Posts
        </button>
        <button
          className={view === "comments" ? "tab active" : "tab"}
          onClick={() => setView("comments")}
        >
          Comments
        </button>
      </div>
      {view === "posts" && renderUserPosts()}
      {view === "comments" && renderUserComments()}
    </div>
  );
}
export default UserProfile;
