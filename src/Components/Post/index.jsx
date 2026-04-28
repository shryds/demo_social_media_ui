import { useState } from "react";
import { addLike, removeLike } from "../../API/posts";
import "./post.css";

export function Post({ post, handleLike }) {

  return (
    <div className="post-card">
      <div className="post-card__header">
        <h3 className="post-card__title">
          {post.title}
          <span className="post-card__title-underline" />
        </h3>
      </div>

      <div className="post-card__content">{post.content}</div>

      <div className="post-card__footer">
        <span
          className="post-card__likes"
          onClick={(e) => handleLike(e, post.id)}
        >
          <span className="post-card__likes-icon">♥</span>
          {post.likes} likes
        </span>
      </div>
    </div>
  );
}
