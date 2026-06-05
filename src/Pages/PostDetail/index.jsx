import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext, useCallback } from "react";
import {
  deleteComment,
  deletePost,
  getComments,
  getPostDetail,
} from "../../API/posts";
import { AuthContext } from "../../Context/Auth";
import { PostContext } from "../../Context/Post";
import { CreateComment } from "../../Components/createComment";

function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [detail, setDetail] = useState(null);
  const [comments, setComments] = useState([]);
  const [loadingDetail, setLoadingDetail] = useState(true);
  const [loadingComments, setLoadingComments] = useState(true);
  const { email, isLoggedIn } = useContext(AuthContext);
  const { refreshPosts } = useContext(PostContext);

  const refreshComments = useCallback(
    () =>
      getComments(id)
        .then((res) => setComments(res))
        .catch(() => {}),
    [id],
  );

  useEffect(() => {
    getPostDetail(id)
      .then((res) => setDetail(res))
      .catch(() => {})
      .finally(() => setLoadingDetail(false));
    refreshComments().finally(() => setLoadingComments(false));
  }, [id, refreshComments]);

  const handleDeletePost = async () => {
    try {
      await deletePost(id);
      refreshPosts();
      navigate("/");
    } catch (err) {
      console.error(`Failed to delete post ${id}:`, err);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(commentId);
      setComments((prev) => prev.filter((c) => c.id !== commentId));
    } catch (err) {
      console.error(`Failed to delete comment ${commentId}:`, err);
    }
  };

  const isPostOwner = email && detail?.user?.email === email;

  return (
    <div className="page">
      {loadingDetail ? (
        <p className="loading">Loading...</p>
      ) : detail ? (
        <div className="card detail-card">
          <div className="detail-card__header">
            <h1>{detail.title}</h1>
            {isPostOwner && (
              <button
                className="btn-danger btn-sm hover-action"
                onClick={handleDeletePost}
              >
                Delete
              </button>
            )}
          </div>
          {detail.img_path && (
            <img
              className="detail-card__image"
              src={detail.img_path}
              alt={detail.title}
            />
          )}
          <p>{detail.content}</p>
        </div>
      ) : (
        <p className="empty">Post not found.</p>
      )}

      <h2 className="section-title">Comments</h2>
      {loadingComments ? (
        <p className="loading">Loading...</p>
      ) : comments.length > 0 ? (
        <div className="comment-list">
          {comments.map((c) => (
            <div key={c.id} className="card comment">
              <div className="comment-header">
                <p className="comment-author">{c.user?.email}</p>
                {email && c.user?.email === email && (
                  <button
                    className="btn-danger btn-sm hover-action"
                    onClick={() => handleDeleteComment(c.id)}
                  >
                    Delete
                  </button>
                )}
              </div>
              <p>{c.comment}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="empty">No comments yet.</p>
      )}
      {isLoggedIn && <CreateComment id={id} onPosted={refreshComments} />}
    </div>
  );
}
export default PostDetail;
