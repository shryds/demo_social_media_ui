import { useState } from "react";
import { createComment } from "../../API/posts";

export function CreateComment({ id }) {
  const [comment, setComment] = useState("");

  const handleChange = (e) => {
    console.log(e.target.value);

    setComment(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await createComment(id, comment);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          post comment
          <input name="comment" value={comment} onChange={handleChange} />
          <button type="submit">Post</button>
        </label>
      </form>
    </>
  );
}
