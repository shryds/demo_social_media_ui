import { useState } from "react";
import { createPost } from "../../API/posts";

export default function CreatePost() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    file: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    console.log("did iy even reach handle submit");
    e.preventDefault();

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("content", formData.content);
      data.append("file", formData.file);
      createPost(data).then((res) => console.log(res));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" onChange={handleChange} />
      <input name="content" onChange={handleChange} />
      <input type="file" name="file" onChange={handleChange} />

      <button type="submit">Create Post</button>
    </form>
  );
}
