import { useContext, useState } from "react";
import { createPost } from "../../API/posts";
import { useNavigate } from "react-router-dom";
import { PostContext } from "../../Context/Post";

export default function CreatePost() {
  const { refreshPosts } = useContext(PostContext);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    file: null,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: files ? (files[0] ?? null) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("content", formData.content);
      if (formData.file) {
        data.append("file", formData.file);
      }
      await createPost(data);
      refreshPosts();
      navigate("/");
    } catch (err) {
      console.error("Failed to create post:", err);
    }
  };

  return (
    <div className="page">
      <h1 className="page-title">Create Post</h1>
      <form className="form-card card" onSubmit={handleSubmit}>
        <label className="field">
          <span>Title</span>
          <input name="title" placeholder="Post title" onChange={handleChange} />
        </label>
        <label className="field">
          <span>Content</span>
          <textarea
            name="content"
            rows={5}
            placeholder="Write something..."
            onChange={handleChange}
          />
        </label>
        <label className="field">
          <span>Image</span>
          <input type="file" name="file" onChange={handleChange} />
        </label>
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
}
