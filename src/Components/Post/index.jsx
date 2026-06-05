import { useContext } from "react";
import { AuthContext } from "../../Context/Auth";
import "./post.css";

export function Post({ post, handleLike, onDelete, canDelete }) {
  const { email } = useContext(AuthContext);
  const isOwner = canDelete || (email && post.user?.email === email);

  return (
    <div className="post-card">
      <div className="post-card__header">
        <h3 className="post-card__title">
          {post.title}
          <span className="post-card__title-underline" />
        </h3>
      </div>

      {post.img_path && (
        <img className="post-card__image" src={post.img_path} alt={post.title} />
      )}

      <div className="post-card__content">{post.content}</div>

      <div className="post-card__footer">
        <span
          className="post-card__likes"
          onClick={(e) => handleLike(e, post.id)}
        >
          <span className="post-card__likes-icon">♥</span>
          {post.likes} likes
        </span>
        {isOwner && onDelete && (
          <button
            className="btn-danger btn-sm hover-action"
            onClick={(e) => onDelete(e, post.id)}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
