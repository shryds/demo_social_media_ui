import { useState } from "react";
import { createComment } from "../../API/posts";

export function CreateComment({ id, onPosted }) {
  const [comment, setComment] = useState("");

  const handleChange = (e) => {
    setComment(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      return;
    }
    try {
      await createComment(id, comment);
      setComment("");
      onPosted?.();
    } catch (err) {
      console.error("Failed to submit comment:", err);
    }
  };

  return (
    <form className='comment-form' onSubmit={handleSubmit}>
      <input
        name='comment'
        placeholder='Add a comment...'
        value={comment}
        onChange={handleChange}
      />
      <button type='submit'>Post</button>
    </form>
  );
}
